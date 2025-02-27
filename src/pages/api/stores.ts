import type { NextApiRequest, NextApiResponse } from "next";
import { IStoreApiResponse, IStoreType } from "@/interface";
import { prisma } from '@/db';
import axios from "axios";

interface IResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStoreApiResponse | IStoreType[] | IStoreType | null>
) {
  if (req.method === "POST") {
    // 데이터 생성을 처리
    const formData = await req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    console.log('@@@DATA: ', data, data.documents[0].y, data.documents[0].x);

    const result = await prisma.store.create({
      data: { ...formData, lat: parseFloat(parseFloat(data.documents[0].y).toFixed(6)), lng: parseFloat(parseFloat(data.documents[0].x).toFixed(6)) },
    });

    return res.status(200).json(result);
  }else {
    // GET 요청 처리
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
}