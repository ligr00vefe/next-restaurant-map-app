'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Loading from '@/components/Loading';
import {IStoreType } from '@/interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingBar from '@/components/LoadingBar';
import SearchFilter from '@/components/SearchFilter';

const StoreListClient = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref as React.RefObject<Element>, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  // console.log('pageRef', pageRef);
  const [q, setQ] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const searchParams = {
    q: q,
    district: district,
  }
  // console.log('q: ', q, ', district: ', district);
  
  const fetchRestaurant = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/stores?page=' + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });
    return data;
  }

  const {
    data: stores,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["stores", searchParams],
    queryFn: fetchRestaurant,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      return lastPage.data?.length > 0 ? lastPage.page + 1 : undefined;
    },
  });

  // console.log('infiniteStores: ' + infiniteStores);

  // 자동으로 다음페이지 불러오기에 타이머 추가
  const fetchNextTimer = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log('fetchNextError: ' + res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextTimer();
      }, 300);
    }

    return () => clearTimeout(timerId);
  }, [isPageEnd, fetchNextTimer, hasNextPage]);

  if (isError) {
    return <div className='w-full h-screen mx-auth pt-[10%] text-red-500 text-center font-semibold'>다시 시도해주세요.</div>;
  }
  
  return (
    <div className='px-4 md:max-w-4xl mx-auto pt-14 pb-8'>
      {/* 검색창 */}
      <SearchFilter setQ={setQ} setDistrict={setDistrict} />
      <ul role="list" className='divide-y divide-gray-100'>
        {isLoading
          ? <Loading />
          : stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: IStoreType, i: number) => (
                <li className='flex justify-between gap-x-6 py-5' key={i}>
                  <div>
                    <Image 
                      src={
                        store?.category 
                          ? `/images/markers/${store?.category}.png`
                          : "/images/markers/default.png"
                      }
                      width={48}
                      height={48}
                      alt="아이콘 이미지"
                    />
                    <div>
                      <div className='text-sm font-semibold leading-9 text-gray-900'>
                        {store?.name}
                      </div>
                      <div className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                        {store?.menu}
                      </div>
                    </div>
                  </div>
                  <div className='hidden sm:flex sm:flex-col sm:items-end'>
                    <div className='text-sm font-semibold leading-9 text-gray-900'>
                      {store?.address}
                    </div>
                    <div className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                      {store?.phone || "번호없음"} | {store?.gugun} | {" "}
                      {store?.category}
                    </div>
                  </div>
                </li>
              ))}
              
            </React.Fragment>
            
        ))}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <LoadingBar />}
      <div className='w-full touch-none h-10 mb-10' ref={ref} />
    </div>
  )
}

export default StoreListClient