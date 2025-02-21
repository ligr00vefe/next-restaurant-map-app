import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { DISTRICT_BUSAN } from '@/data/busan_district_data';

interface ISearchFilterProps {
  setQ: Dispatch<SetStateAction<string | null>>;
  setDistrict: Dispatch<SetStateAction<string | null>>;
}

const SearchFilter = ({
  setQ,
  setDistrict,
}: ISearchFilterProps) => {
  return (
    <>
      <div className='flex flex-col md:flex-row gap-2 my-4'>
        <div className='flex items-center justify-center w-full gap-2'>
          <AiOutlineSearch className='w-6 h-6' />
          <input 
            type="search" 
            placeholder='음식점 검색' 
            className='block w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500'
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select 
          className='bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg outline-none focus:border-blue-500 block w-full p-3'
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">지역 선택</option>
          {DISTRICT_BUSAN.map((data) => (
            <option value={data} key={data}>{data}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default SearchFilter