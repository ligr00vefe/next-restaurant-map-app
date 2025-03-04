import Image from 'next/image';
import { 
  AiOutlineClose, 
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineCheck
} from 'react-icons/ai';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { currentStoreState } from '@/atom';
import Like from '../like/Like';

const StoreBox = () => {
  const [store, setStore ] = useRecoilState(currentStoreState);
  const router = useRouter();

  return (
    <div className='fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white'>
      {store && (
        <>
          <div className='p-8'>
            <div className='flex justify-between items-start'>
              <div className='flex gap-4 items-center'>
                <Image src={
                  store?.category 
                    ? `/images/markers/${store?.category}.png` 
                    : "/images/markers/default.png"
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className='font-semibold'>{store?.name}</div>
                  <div className='text-sm'>{store?.gugun}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>       
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-4 flex gap-2 items-center">
                  <HiOutlineMapPin />
                  {store?.address || '주소가 없습니다.'}
              </div>  
              <Like storeId={store.id} className="" />
            </div>                       
            <div className="mt-4 flex gap-2 items-center">
                <AiOutlinePhone />
                {store?.phone}
            </div>     
            <div className="mt-4 flex gap-2 items-center">
                <AiOutlineCheck />
                {store?.category}
            </div>  
            <div className="mt-4 flex gap-2 items-center">
                <AiOutlineInfoCircle />
                {store?.description}
            </div>                   
          </div>
          <div>
            <button type='button' onClick={() => router.push(`/stores/${store.id}`)} className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg">상세보기</button>
          </div>
        </>        
      )}
    </div>
  )
}

export default StoreBox