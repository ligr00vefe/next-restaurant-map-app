import React, { Suspense } from 'react'
import MypageClient from './MypageClient'

const Mypage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <MypageClient />      
      </Suspense>    
    </>
  )
}

export default Mypage