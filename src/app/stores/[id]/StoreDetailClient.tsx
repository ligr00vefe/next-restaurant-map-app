'use client';

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { IStoreType } from '@/interface';
import LoadingBar from '@/components/loading/LoadingBar';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Like from '@/components/like/Like';
import Comments from '@/components/comments/Comments';

const StoreDetailClient = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  
  // 슬래시(`/`)를 기준으로 분리하여 slug 값 추출
  const segments = pathname!.split('/').filter(Boolean);
  const slug = segments[segments.length - 1];

  // console.log('pathname: ' + pathname); 
  // console.log('segments: ' + segments); 
  // console.log('slug: ' + slug); 

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${slug}`);
    return data as IStoreType;
  }
  
  const { 
    data: store, 
    isFetching, 
    isSuccess,
    isError,
  } = useQuery<IStoreType>({
    queryKey: [`store-${slug}`],
    queryFn: fetchStore,
    enabled: !!slug,
    // 새로고침을 해도 페이지를 리페칭하지 않음
    refetchOnWindowFocus: false,
  });
  // console.log(store, isFetching, isError);

  const handleDelete = async () => {
    const confirm = window.confirm('해당 식당 정보를 삭제하시겠습니까?');

    if (confirm && store) {
      try {
        const result = await axios.delete(`/api/stores?id=${store?.id}`);
      
        if (result.status === 200) {
          toast.success('식당 정보가 삭제되었습니다.')
          router.replace('/stores');
        }else {
          toast.error('다시 시도해주세요.')
        }
      } catch (error) {
        console.log(error);
        toast.error('다시 시도해주세요.')
      } 
    }    
  }

  if (isError) {
    return <div className='w-full h-screen mx-auth pt-[10%] text-red-500 text-center font-semibold'>다시 시도해주세요.</div>;
  }

  if (isFetching) {
    return <LoadingBar className='mt-[20%]' />
  }

  return (
    <>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        <div className='md:flex justify-between items-center py-4 md:py-0'>
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">{store?.name}</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">{store?.address}</p>
          </div>
          {status === 'authenticated' && store && (
            <div className='flex items-center gap-4 px-4 py-3'>
              <Like storeId={store.id} className="" />
              <Link href={`/stores/${store?.id}/edit`} className='underline hover:text-gray-400 text-sm'>수정</Link>
              <button 
                type='button' 
                className='underline hover:text-gray-400 text-sm'
                onClick={handleDelete}
              >삭제</button>
            </div>
          )}          
        </div>       
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">업체명</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">주소</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.address}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">위도</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lat}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">경도</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lng}</dd>
            </div>
          
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">연락처</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.phone}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">분류</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.category}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">주요 메뉴</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.menu}</dd>
            </div>
            <div className="px-4 pt-6 pb-14 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">상세 설명</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.description}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <>
          <div className='overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]'>
            <Map lat={store?.lat} lng={store?.lng} zoom={1} />
            <Marker store={store} />
          </div>
          <Comments storeId={store.id} />
        </>
      )}
    </>
    
  )
}

export default StoreDetailClient