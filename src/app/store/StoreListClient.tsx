'use client';
import { StoreType } from '@/interface';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const StoreListClient = () => {
  const [stores, setStores] = useState<StoreType[]>([]);
  
    useEffect(() => {
      const fetchStores = async () => {
        const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  
        setStores(res.data);
      };
      fetchStores();
    }, [stores]);
  
  return (
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      <ul role="list" className='divide-y divide-gray-100'>
        {stores?.map((store, index) => (
          <li className='flex justify-between gap-x-6 py-5' key={index}>
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
                  {store?.gugun}
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
      </ul>
    </div>
  )
}

export default StoreListClient