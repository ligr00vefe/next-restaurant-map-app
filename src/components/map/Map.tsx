'use client';

/*global kakao*/
import Script from "next/script";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { locationState, mapState } from '@/atom';
import { ILocationType } from "@/interface";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({   
  lat, 
  lng, 
  zoom 
}: ILocationType) => {
  // recoil 전역 변수
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);
  
  const loadKakaoMap = () => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng),
        level: zoom ?? location.zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);      
    
      setMap(map);
    })
  }
  return (
    <>
    <Script 
      type="text/javascript"
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
      onReady={loadKakaoMap}
    />
    <div id="map" className='w-full h-screen'></div>
  </>
  )
}

export default Map