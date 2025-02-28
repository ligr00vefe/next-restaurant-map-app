'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Loading from '@/components/loading/Loading';
import {IStoreType } from '@/interface';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingBar from '@/components/loading/LoadingBar';
import SearchFilter from '@/components/search/SearchFilter';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { searchState } from '@/atom';
import StoreList from '@/components/store/StoreList';

const StoreListClient = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref as React.RefObject<Element>, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  // console.log('pageRef', pageRef);
  const searchValue = useRecoilValue(searchState);

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
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
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      {/* 검색창 */}
      <SearchFilter />
      <ul role="list" className='divide-y divide-gray-100'>
        {isLoading
          ? <Loading />
          : stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: IStoreType, i: number) => (
                <StoreList store={store} i={i} key={i} />
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