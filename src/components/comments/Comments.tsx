'use client';
import React from 'react'
import { useSession } from 'next-auth/react';
import CommentForm from './CommentForm';

interface ICommentsProps {
  storeId: number;
}

const Comments = ({
  storeId
}: ICommentsProps) => { 
  const { status } = useSession();

  return (
    <div className='md:max-w-2xl py-8 px-2 mb-20 mx-auto'>
      {/* Comments from */}
        {status === 'authenticated' && (
          <CommentForm storeId={storeId} />
        )}               
      {/* Comments list */}
    </div>
  )
}

export default Comments