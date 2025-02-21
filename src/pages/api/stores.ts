import type { NextApiRequest, NextApiResponse } from "next";
import { IStoreApiResponse, IStoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";

interface IResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStoreApiResponse | IStoreType[] | IStoreType>
) {

  // const page = parseInt(req.query.page as string, 10) || ""; // 요청에서 page 가져오기
  const  {page = "", limit = "", q = "", district = "" }: IResponseType = req.query;
  if (page) {
    const pageSize = limit ? parseInt(limit) : 10; 
    const skipPage = parseInt(page) - 1;
    const count = await prisma.store.count();
  
    
    const stores = await prisma.store.findMany({
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
      orderBy: { id: 'asc' },
      take: pageSize, 
      skip: skipPage * pageSize,
    });
  
    // totalPage, data, page, totalCount
  
    res.status(200).json({
      page: parseInt(page),
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