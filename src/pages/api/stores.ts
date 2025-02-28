import type { NextApiRequest, NextApiResponse } from "next";
import { IStoreApiResponse, IStoreType } from "@/interface";
import { prisma } from '@/db';
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';

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
  const { page = '', limit = '', q, district = '', id }: IResponseType = req.query;
  // console.log('page: ', page, 'limit: ', limit, 'district: ', district, 'id: ', id);
  const session = await getServerSession(req, res, authOptions);
  // console.log('session: ', session);

  if (req.method === "POST") {
    // 데이터 생성을 처리
    const formData = await req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    // 위/경도 데이터 조회
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    // console.log('@@@DATA: ', data, data.documents[0].y, data.documents[0].x);

    const result = await prisma.store.create({
      data: { ...formData, lat: parseFloat(parseFloat(data.documents[0].y).toFixed(6)), lng: parseFloat(parseFloat(data.documents[0].x).toFixed(6)) },
    });

    return res.status(200).json(result);
  }else if (req.method === 'PUT') {
    // 데이터 수정 요청 처리
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

    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: parseFloat(parseFloat(data.documents[0].y).toFixed(6)), lng: parseFloat(parseFloat(data.documents[0].x).toFixed(6)) },
    });

    return res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    // 데이터 삭제 요청 처리
    if (id) {
      const result = await prisma.store.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json(result);
    }
    
    return res.status(500).json(null);
  } else {
    // GET 요청 처리
    if (page) {
      // 맛집 목록 페이지
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
      // 맛집 카카오 맵 페이지
      const { id }: { id?: string } = req.query; 

      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          id: id ? parseInt(id) : {},
        },
        include: {
          likes: {
            where: session ? { userId: Number(session.user.id) } : {},
          }
        }
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }  
}