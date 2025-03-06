'use client';
import { mapState } from '@/atom';
import { useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import FullPageLoader from '../loading/FullPageLoader';

const CurrentLocationButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setLoading(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: Infinity,
    };
    
    if (navigator.geolocation && map) {
    
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) =>  {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          )
          // console.log('currentPosition: ', currentPosition);

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success('현재 위치로 이동되었습니다.');
          }          

          return currentPosition;
        },
        () => {
          toast.error('현재 위치를 가져올 수 없습니다.');
          setLoading(false);
        },
        options
      );
      
    }
  };

  return (
    <>
      {loading && (
        <FullPageLoader />
      )}

      <button 
        type='button' 
        onClick={handleCurrentPosition}
        className='fixed z-10 p-2 shadow right-10 bottom-20 bg-white rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200'
      >
        <MdOutlineMyLocation className='w-5 h-5' />
      </button>
    </>
  )
}

export default CurrentLocationButton