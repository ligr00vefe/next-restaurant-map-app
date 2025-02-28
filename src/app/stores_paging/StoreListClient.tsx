'use client';
import Loading from '@/components/loading/Loading';
import Pagination from '@/components/Pagination';
import { IStoreApiResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const StoreListClient = () => {  
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") || "1";

  async function fetchRestaurants() {
    const { data } = await axios.get(`/api/stores?page=${page}`);  
    return data as IStoreApiResponse;
  }

  const { isLoading, isError, data: stores } = useQuery({
    queryKey: [`stores-${page}`],
    queryFn: fetchRestaurants
  });

  // console.log('stores: ' + JSON.stringify(stores, null, 2));

  if (isError) {
    return <div className='w-full h-screen mx-auth pt-[10%] text-red-500 text-center font-semibold'>다시 시도해주세요.</div>;
  }
  
  return (
    <div className='px-4 md:max-w-4xl mx-auto py-8'>
      <ul role="list" className='divide-y divide-gray-100'>
        {isLoading
          ? <Loading />
          : stores?.data?.map((store, index) => (
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
      </ul>
      {stores?.totalPage && stores?.totalPage > 0 && <Pagination totalPage={stores?.totalPage} page={page} pathname='/stores_paging' />}    
    </div>
  )
}

export default StoreListClient