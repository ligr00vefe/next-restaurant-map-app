import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ICommentApiResponse, ICommentType } from "@/interface";

interface IResponseType {
  id?: string;
  page?: string;
  limit?: string;
  storeId?: string;
  user?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICommentType | ICommentApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  const { 
    id = "", 
    page = "1", 
    limit = "10", 
    storeId = "",
  }: IResponseType = req.query;

  if (req.method === 'POST') {
    // 댓글 생성 로직    
    if (!session?.user || !id) {
      return res.status(401);
    }

    const { storeId, body }: { storeId: number; body: string } = req.body;
    const comment = await prisma.comment.create({
      data: {
        storeId,
        body,
        userId: Number(session?.user.id),
      }
    })
    return res.status(200).json(comment);
  } else if (req.method === 'DELETE') {
    // 댓글 삭제 로직
    if (!session?.user) {
      return res.status(401);      
    }    

    const result = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });  
    return res.status(200).json(result);
  } else {
    // 댓글 가져오기
    const skipPage = parseInt(page) - 1;
    const count = await prisma.comment.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {},
      }
    });

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
      }
    });
    // console.log('comments: ', comments);

    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}