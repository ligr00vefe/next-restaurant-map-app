import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ICommentFormProps {
  storeId: number;
  refetch: () => void;
}

const CommentForm = ({ 
  storeId, 
  refetch 
}: ICommentFormProps) => {
  const { 
    register, 
    handleSubmit, 
    resetField,
    formState: { errors },
    } = useForm();

  return (
    <form 
      onSubmit={handleSubmit(async (data) => {
        // console.log('data: ', data);
        const result = await axios.post('/api/comments', {
          ...data,
          storeId,
        });
        // console.log('result: ', result);

        if (result.status === 200) {
          toast.success('댓글을 등록했습니다.');
          resetField('body');
          refetch?.();
        }else {
          toast.error('다시 시도해주세요.');
        }
      })}
      className='flex flex-col space-y-2'
    >
      {errors?.body?.type === 'required' && (
        <div className='text-xs text-red-600'>필수 입력사항입니다.</div>
      )}
      <textarea 
        rows={3}
        placeholder='댓글을 작성해주세요...'
        {...register('body', { required: true }) }
        className='block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6'
      ></textarea>
      <button type='submit' className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm mt-2 rounded-md'>작성하기</button>
    </form>
  )
}

export default CommentForm