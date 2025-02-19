'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const StoreDetailClient = () => {
  const router = useRouter();
  const pathname = usePathname(); // e.g., '/blog/hello-world'

  // 슬래시(`/`)를 기준으로 분리하여 slug 값 추출
  const segments = pathname.split('/').filter(Boolean); // ['', 'blog', 'hello-world']
  const slug = segments[segments.length - 1];

  console.log('router: ' + router);
  console.log('pathname: ' + pathname); 
  console.log('segments: ' + segments); 
  console.log('slug: ' + slug); 
  return (
    <div>StoreDetailClient</div>
  )
}

export default StoreDetailClient