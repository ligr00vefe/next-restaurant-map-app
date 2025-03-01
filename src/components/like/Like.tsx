'use client';
import { IStoreType } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface ILikeProps {
  storeId?: number;
  className?: string;
}

const Like = ({ storeId, className }: ILikeProps) => {
  const { data: session, status } = useSession();
  // console.log('session: ', session);

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as IStoreType;
  }

  const { 
    data: store,
    refetch
  } = useQuery<IStoreType>({
    queryKey: [`like-${storeId}`],
    queryFn: fetchStore,
    enabled: !!storeId,
    refetchOnWindowFocus: false,
  });

  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post('/api/likes', {
          storeId: store?.id,
        });
        
        if (like.status === 201) {
          toast.success('식당을 찜했습니다.');
        }else {
          toast.warn('찜을 취소했습니다.');
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    }else if (status === 'unauthenticated') {
      toast.warn('로그인 후 이용해주세요.');
    }
  };
  
  return (
    <>
      <button 
        type='button'
        onClick={toggleLike}
        className={className}
      >
        {store?.likes && store?.likes?.length > 0 ? (
          <AiFillHeart className='text-red-500 hover:text-red-600 focus:text-red-600' />
        ) : (
          <AiOutlineHeart className='hover:text-red-600 focus:text-red-600' />
        )
      }
      </button>
    </>
  )
}

export default Like