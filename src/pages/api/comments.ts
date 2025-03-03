import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/db';
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ICommentApiResponse, ICommentType } from "@/interface";

interface IResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICommentType | ICommentApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    // 댓글 생성 로직    
    if (!session?.user) {
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
  } else {
    // 댓글 가져오기
  }
}