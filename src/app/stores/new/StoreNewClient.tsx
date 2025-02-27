'use client';

import AddressSearch from '@/components/search/AddressSearch';
import { CATEGORY_ARR, DISTRICT_BUSAN_ARR } from '@/data/store_data';
import { IStoreType } from '@/interface';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const StoreNewClient = () => {
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors }, 
  } = useForm<IStoreType>();

  return (
    <form 
      className='px-4 pt-14 pb-8 md:max-w-4xl mx-auto'
      onSubmit={handleSubmit(async (data) => {
        console.log('store new data: ', data);
        try {
          const result = await axios.post('/api/stores', data);
          // console.log('store new result: ', result);

          if (result.status === 200) {
            // 성공
            toast.error('맛집 등록에 성공했습니다.');
            router.push(`/stores/${result?.data?.id}`);
          }else { 
            // 실패
            toast.error('다시 시도해주세요.');            
          }
        } catch (e) {
          console.log('store new error: ', e);
          toast.error('데이터 생성중 문제가 생겼습니다. 다시 시도해주세요.');
        }        
      })} 
    >
      <div className="space-y-12">    

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">맛집 등록</h2>
          <p className="mt-1 text-sm/6 text-gray-600">아래 내용을 입력해서 맛집을 등록해주세요.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  autoComplete="가게명 입력"
                  className="block w-full rounded-md bg-white px-3 py-1.5 ring-1 ring-inset ring-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register('name', { required: true })}
                />
                {errors.name?.type === 'required' && (
                  <div className='pt-2 text-ts text-red-600'>필수 입력사항입니다.</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                카테고리
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md bg-white px-2 py-1.5 ring-1 ring-inset ring-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register('category', { required: true })}
                >
                  <option value="">카테고리 선택</option>
                  {CATEGORY_ARR.map((value, key) => (
                    <option value={value} key={key}>{value}</option>
                  ))}
                </select>
                {errors.category?.type === 'required' && (
                  <div className='pt-2 text-ts text-red-600'>필수 입력사항입니다.</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                연락처
              </label>
              <div className="mt-2">
                <input              
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 ring-1 ring-inset ring-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register('phone', { required: true })}
                />
                {errors.phone?.type === 'required' && (
                  <div className='pt-2 text-ts text-red-600'>필수 입력사항입니다.</div>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                주소
              </label>
              <div className="mt-2">
                <AddressSearch register={register} errors={errors} setValue={setValue} />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="gugun" className="block text-sm/6 font-medium text-gray-900">
                지역구 구분
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md bg-white px-2 py-1.5 ring-1 ring-inset ring-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register('gugun', { required: true })}
                >
                  <option value="">지역구 선택</option>
                  {DISTRICT_BUSAN_ARR.map((value, key) => (
                    <option value={value} key={key}>{value}</option>
                  ))}
                </select>
                {errors.gugun?.type === 'required' && (
                  <div className='pt-2 text-ts text-red-600'>필수 입력사항입니다.</div>
                )}
              </div>
            </div>
            
            {/* <div className="sm:col-span-2">
              <label htmlFor="gugun" className="block text-sm/6 font-medium text-gray-900">
                업종 구분
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md bg-white px-2 py-1.5 ring-1 ring-inset ring-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register('gugun', { required: true })}
                >
                  <option value="">업종 선택</option>
                  {STORE_TYPE_ARR.map((value, key) => (
                    <option value={value} key={key}>{value}</option>
                  ))}
                </select>
                {errors.gugun?.type === 'required' && (
                  <div className='pt-2 text-ts text-red-600'>필수 입력사항입니다.</div>
                )}
              </div>
            </div> */}

            <div className="col-span-full">
              <label htmlFor="menu" className="block text-sm/6 font-medium text-gray-900">
                주메뉴
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 ring-1 ring-inset ring-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register('menu')}
                />
              </div>
            </div>           
          </div>
        </div>        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button 
          type="button" 
          className="text-sm/6 font-semibold text-gray-900"
          onClick={() => router.back()}
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          제출하기
        </button>
      </div>
    </form>
  )
}

export default StoreNewClient