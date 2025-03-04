/* eslint-disable @next/next/no-img-element */
'use client';
import { ICommentApiResponse } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react'
import { toast } from 'react-toastify';

interface ICommentListProps {
  comments?: ICommentApiResponse;
}

const CommentList = ({
  comments
}: ICommentListProps) => {
    const { data: session } = useSession();

    const handleDeleteComment = async (id: number) => {
      const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');

      if (confirm && comments) {
        try {
          const result = await axios.delete(`/api/comments?id=${id}`);     
          if (result.status === 200) {
            toast.success('댓글을 삭제했습니다.');
          }else {
            toast.error('다시 시도해주세요.');
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  
  return (
    <div className='my-10'>
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map((comment) => (
          <div 
            key={comment.id}
            className='flex items-center space-x-4 text-gray-500 mb-8 border-b border-gray-200 pb-8'
          >
            <div>
              <img 
                src={comment?.user?.image || '/images/markers/default.png'} 
                alt="프로필 이미지" 
                width={40}
                height={40}
                className='rounded-full bg-gray-10 w-10 h-10'
              />
            </div>
            <div className='flex flex-col flex-1 space-y-2'>
              <div>
                <div>{comment?.user?.name ?? '사용자'} | {comment?.user?.email}</div>
              </div>
              <div className='text-xs'>{new Date(comment?.createdAt)?.toLocaleString()}</div>
              <div className='text-black mt-1 text-base'>
                {comment.body}
              </div>
            </div>
            <div>
              {comment.userId === session?.user?.id && (
                <button
                  className='underline text-gray-500 hover:text-gray-400'
                  onClick={() => handleDeleteComment(comment.id)}
                >삭제</button>
              )}
            </div>              
          </div>
        ))
      ) : (
        <div className='p-4 border border-gray-200 rounded-md text-sm text-gray-400'>댓글이 없습니다.</div>
      )}
    </div>
  )
}

export default CommentList