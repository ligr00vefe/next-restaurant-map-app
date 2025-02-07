'use client';
import { StoreType } from '@/interface';
import React, { useEffect, useState } from 'react'

const StoreListClient = () => {
  const [stores, setStores] = useState<StoreType[]>([]);
  
    useEffect(() => {
      const fetchStores = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
        const data = await res.json();
  
        setStores(data);
      };
  
      fetchStores();
    }, []);
  
  return (
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      <ul role="list" className='divide-y divide-gray-100'>
        {stores?.map((store, index) => (
          <li className='flex justify-between gap-x-6 py-5' key={index}>
            <div>
              <Image src={
                store?.bizcnd_code_nm 
                  ? `/images/markers/${store?.bizcnd_code_nm}.png`
                  : "/images/markers/default.png"
                }
                width={48}
                height={48}
                alt="아이콘 이미지"
              />
              <div>
                <div className='text-sm font-semibold leading-9 text-gray-900'>
                  {store?.main_title}
                </div>
                <div className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                  {store?.title}
                </div>
              </div>
            </div>
            <div className='hidden sm:flex sm:flex-col sm:items-end'>
              <div className='text-sm font-semibold leading-9 text-gray-900'>
                {store?.addr1}
              </div>
              <div className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                {store?.cntct_tel || "번호없음"} | {store?.gugun_nm} | {" "}
                {store?.bizcnd_code_nm}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StoreListClient