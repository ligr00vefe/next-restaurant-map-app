import React, { Suspense } from 'react'
import StoreDetailClient from './StoreDetailClient'

const StoreDetailPage = () => {

  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <StoreDetailClient />
      </Suspense>
    </>    
  )
}

export default StoreDetailPage