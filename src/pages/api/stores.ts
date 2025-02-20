import type { NextApiRequest, NextApiResponse } from "next";
import { IStoreApiResponse, IStoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStoreApiResponse | IStoreType[] | IStoreType>
) {

  // const page = parseInt(req.query.page as string, 10) || ""; // 요청에서 page 가져오기
  const {page = '', id }: { page?: string, id?: string } = req.query;
  if (page) {
    const pageSize = 10; // 한 페이지당 10개 아이템
    const skipPage = parseInt(page) - 1;
    const count = await prisma.store.count();
  
    
    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
      take: pageSize,
      skip: skipPage * pageSize,
    });
  
    // totalPage, data, page, totalCount
  
    res.status(200).json({
      page: page,
      data: stores,
      totalPage: Math.ceil(count / 10),
      totalCount: count,
    });
  } else {
    const { id }: { id?: string } = req.query; 
    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
      where: {
        id: id ? parseInt(id) : {},
      }
    });

    return res.status(200).json(id ? stores[0] : stores);
  }  
}