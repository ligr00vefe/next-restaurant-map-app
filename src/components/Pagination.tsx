import Link from 'next/link'
import React from 'react'

interface IPagenationProps {
  totalPage: number;
  page: string;
}

const Pagination = ({ totalPage, page }: IPagenationProps) => {
  return (
    <div className='py-6 w-full px-10 flex justify-center gap-4 text-black bg-white my-10 flex-wrap'>
          {totalPage <= 10 ? (
            [...Array(totalPage)].map((x, i) => (
              <Link 
                key={i} 
                href={{ pathname: '/stores', query: { page: i + 1 } }}
              >
                <span 
                  className={`px-3 py-2 border shadow-sm bg-white ${
                    i + 1 === parseInt(page, 10) 
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-300'
                  }`}
                >
                  {i + 1}
                </span>
              </Link>
            ))
          ) : (
            <>
              {parseInt(page) > 1 && (
                <Link 
                  href={{ pathname: '/stores', query: { page: parseInt(page) - 1 } }}
                >
                  <span 
                    className='px-3 py-2 border shadow-sm bg-white'
                  >이전</span>
                </Link>
              )} 
              
              <Link 
                href={{ pathname: '/stores', query: { page: parseInt(page) } }}
              >
                <span 
                  className='px-3 py-2 border shadow-sm bg-white text-blue-600'
                >
                  {page}
                </span>
              </Link>
              {totalPage > parseInt(page) && (
                <Link 
                  href={{ pathname: '/stores', query: { page: parseInt(page) + 1 } }}
                >
                  <span 
                    className='px-3 py-2 border shadow-sm bg-white'
                  >다음</span>
                </Link>
              )}              
            </>
          )}          
        </div>
  )
}

export default Pagination