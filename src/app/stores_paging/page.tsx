import React, { Suspense } from 'react'
import StoreListClient from './StoreListClient'

const StorePage = () => {
  return (
    <>
     <Suspense fallback={<div>로딩 중...</div>}>
      <StoreListClient />
     </Suspense>
    </>
  )
}

export default StorePage