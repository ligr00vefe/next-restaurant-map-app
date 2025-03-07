import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ILikeApiResponse, ILikeType } from "@/interface";

interface IResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILikeType | ILikeApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  // console.log('@@session: ', session);
  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const { storeId }: { storeId: number } = req.body;

    // like 데이터가 있는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: Number(session?.user?.id),
      },
    });

    const message = '';

    // 만약 이미 찜을 했다면, 해당 like 데이터 삭제, 아니라면, 생성
    if (like) {
      // 이미 찜을 한 상황
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    }else {
      // 찜을 하지 않은 상황
      like = await prisma.like.create({
        data: {
          storeId,
          userId: Number(session?.user?.id),
        },
      });
      return res.status(201).json(like);
    }    
  } else {
    // GET method 처리
    const { page = "1", limit = "10" }: IResponseType = req.query;
    const pageSize = limit ? parseInt(limit) : 10; 
    const skipPage = parseInt(page) - 1;
    const count = await prisma.like.count({
      where: {
        userId: session.user.id,
      },
    });

    const likes = await prisma.like.findMany({
      where: {
        userId: Number(session.user.id),
      },
      include: {
        store: true,
      },
      orderBy: { createdAt: 'desc' },
      take: pageSize, 
      skip: skipPage * pageSize,
    });

    return res.status(200).json({
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / 10),
      totalCount: count,
    });
  }
}