import { NextResponse } from "next/server";
import { prisma } from '@/db';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const session = await getServerSession(authOptions);

  const pageSize = limit ? parseInt(limit) : 10; 
  const skipPage = parseInt(page) - 1;
  const count = await prisma.like.count({
    where: {
      userId: session?.user.id,
    },
  });
  
  const likes = await prisma.like.findMany({
    where: {
      userId: Number(session?.user.id),
    },
    include: {
      store: true,
    },
    orderBy: { createdAt: 'desc' },
    take: pageSize, 
    skip: skipPage * pageSize,
  });

  return NextResponse.json({
    data: likes,
    page: parseInt(page),
    totalPage: Math.ceil(count / 10),
    totalCount: count,
  },
  {
    status: 200
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(null, { status: 401 });
  }

  const { storeId }: { storeId: number } = await req.json();

  // like 데이터가 있는지 확인
  let like = await prisma.like.findFirst({
    where: {
      storeId,
      userId: Number(session?.user?.id),
    },
  });
  // console.log('like: ', like);

  const message = '';

  // 만약 이미 찜을 했다면, 해당 like 데이터 삭제, 아니라면, 생성
  if (like) {
    // 이미 찜을 한 상황
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
    return NextResponse.json({ deleted: true }, { status: 200 });
  }else {
    // 찜을 하지 않은 상황
    like = await prisma.like.create({
      data: {
        storeId,
        userId: Number(session?.user?.id),
      },
    });
    return NextResponse.json({ like, deleted: false }, { status: 201 });
    // status 201: 서버가 요청을 성공적으로 처리했고, 새로운 리소스를 생성했음을 의미하는 HTTP 상태 코드.
  }    
}