 
'use client';
import React from 'react'
import { useSession } from 'next-auth/react';
import CommentForm from './CommentForm';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { ICommentApiResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import CommentList from './CommentList';
import Pagination from '../Pagination';

interface ICommentsProps {
  storeId: number;
}

const Comments = ({
  storeId
}: ICommentsProps) => { 
  const { status } = useSession();
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") || "1";

  const fetchComments = async () => {
    const { data } = await axios(`/api/comments?storeId=${storeId}&limit=5&page=${page}`);
    return data as ICommentApiResponse;
  }

  const { 
    data: comments,
    refetch
  } = useQuery({
    queryKey: [`comments-${storeId}-${page}`],
    queryFn: fetchComments
  });

  console.log('comments: ', comments);

  return (
    <div className='md:max-w-2xl py-8 px-2 mb-20 mx-auto'>
      {status === 'authenticated' && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}               
      <CommentList comments={comments} refetch={refetch} />
      {comments?.totalPage && (
        <Pagination totalPage={comments?.totalPage} page={page} pathname={`/stores/${storeId}`} />        
      )}
    </div>
  )
}

export default Comments