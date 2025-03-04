/* eslint-disable @next/next/no-img-element */
'use client';

import { signOut, useSession } from "next-auth/react";

const MypageClient = () => {
  const { data: session } = useSession();
  console.log("session: ", session);
  return (
      <div className="md:max-w-5xl mx-auto px-4 py-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">마이페이지</h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">사용자 기본 정보</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이름</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user.name ?? "사용자"}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이메일</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이미지</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <img 
                  src={session?.user.image || '/images/markers/default.png'} 
                  alt='프로필 이미지' 
                  width={48} 
                  height={48} 
                  className='rounded-full w-12 h-12'
                />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">설정</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button type="button" onClick={() => signOut()} className="underline hover:text-gray-500">로그아웃</button>
              </dd>
            </div>           
          </dl>
        </div>
      </div>
  )
}

export default MypageClient