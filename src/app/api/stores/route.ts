import { NextResponse } from "next/server";
import { prisma } from '@/db';
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/authOptions';


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const q = searchParams.get('q') as string;
  const district = searchParams.get('district') as string;
  const id = searchParams.get('id') as string;

  const session = await getServerSession(authOptions);

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
  
    return NextResponse.json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    }, 
    {
      status: 200,
    })
  } else {
    // 맛집 카카오 맵 페이지
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

    return NextResponse.json(id ? stores[0] : stores, { status: 200 });
  }
}

export async function POST(req: Request) {
  // 데이터 생성을 처리
  const formData = await req.json();
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

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: Request) {
  // 데이터 수정 요청 처리
  const formData = await req.json();
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

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(req: Request) {
  // 데이터 삭제 요청 처리
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') as string;

  if (id) {
    const result = await prisma.store.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(result, { status: 200 });
  }

  return NextResponse.json(null, { status: 500 });
}
