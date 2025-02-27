import { IStoreType } from '@/interface';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useState } from 'react';

interface IAddressSearchProps {
  register: UseFormRegister<IStoreType>;
  errors: FieldErrors<IStoreType>;
  setValue: UseFormSetValue<IStoreType>; 
}

const AddressSearch = ({ register, errors, setValue }: IAddressSearchProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setValue('address', fullAddress);
    setIsOpen(false);
  };
   
  return (
    <>
      <div className='grid grid-cols-3 md:grid-cols-6 gap-6'>
        <input
          readOnly
          placeholder='주소를 검색해주세요'
          className="col-span-2 block w-full rounded-md bg-white px-3 py-1.5 ring-1 ring-inset ring-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          {...register('address')}
        />
        <button 
          type='button' 
          onClick={() => setIsOpen(!isOpen)}
          className='bg-blue-700 hover:bg-blue-600 py-1.5 px-2 rounded text-white'
        >주소 검색</button>
      </div>
      
      {errors.address?.type === 'required' && (
        <div className='pt-2 text-ts text-red-600'>필수 입력사항입니다.</div>
      )}
      {isOpen && (
        <div className='border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2 mx-auto mt-3 md:mt-4'>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  )
}

export default AddressSearch