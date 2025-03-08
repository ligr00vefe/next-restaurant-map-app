import React, { Suspense } from 'react'
import LikesClient from './LikesClient'

const LikesPage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <LikesClient />      
      </Suspense>
    </>
  )
}

export default LikesPage