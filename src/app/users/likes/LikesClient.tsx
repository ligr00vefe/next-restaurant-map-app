'use client';
import Loading from '@/components/loading/Loading';
import Pagination from '@/components/Pagination';
import StoreList from '@/components/store/StoreList';
import { ILikeApiResponse, ILikeType } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { useSearchParams } from 'next/navigation';

const LikesClient = () => {
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") || "1";

  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data as ILikeApiResponse;
  }

  const { 
    data: likes,
    isError,
    isSuccess,
    isLoading
  } = useQuery<ILikeApiResponse>({
    queryKey: [`likes-${page}`],
    queryFn: fetchLikes,
  });
  // console.log('likes: ', likes);

  if (isError) {
    return <div className='w-full h-screen mx-auth pt-[10%] text-red-500 text-center font-semibold'>다시 시도해주세요.</div>;
  }

  return (
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      <h3 className='text-lg font-semibold'>찜한 맛집</h3>
      <div className='mt-1 text-gray-500 text-sm'>찜한 가게 리스트입니다.</div>
      <ul role='list' className='divide-y divide-gray-100 mt-10'>
        {isLoading
          ? <Loading />
          : (likes?.data?.map((like: ILikeType, i: number) => (
            <StoreList store={like.store} i={i} key={i} />
          ))
        )}
        {isSuccess && !!!likes.data.length && (
          <div className='p-4 border-0 rounded-md text-sm text-gray-400'>찜한 가게가 없습니다.</div>
        )}
      </ul>
      <Pagination totalPage={likes?.totalPage} page={page} pathname='/users/likes' />          
    </div>
  )
}

export default LikesClient