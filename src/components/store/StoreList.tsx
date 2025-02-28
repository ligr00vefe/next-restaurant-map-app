'use client';
import { IStoreType } from '@/interface'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface IStoreList {
  store?: IStoreType;
  i: number;
}

const StoreList = ({
  store,
  i
}:IStoreList) => {
  const router = useRouter();
  return (
    <>
      <li className='flex justify-between gap-x-6 py-5 cursor-pointer' key={i} onClick={() => router.push(`/stores/${store?.id}`)}>
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
    </>
  )
}

export default StoreList