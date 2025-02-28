import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ILikeApiResponse, ILikeType } from "@/interface";

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
    const likes = await prisma.like.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: session.user.id
      },
      include: {
        store: true,
      },
    });

    return res.status(200).json({
      data: likes,
    });
  }
}