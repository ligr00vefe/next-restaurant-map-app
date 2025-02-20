/*global kakao*/
import React, { Dispatch, SetStateAction } from 'react'
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

interface IMapProps {
  setMap: Dispatch<SetStateAction<any>>;
  lat?: number | null;
  lng?: number | null;
  zoom?: number;
}

const DEFAULT_LAT = 35.176448;
const DEFAULT_LNG = 129.079661;
const DEFAULT_ZOOM = 3;

const Map = ({ 
  setMap, 
  lat, 
  lng, 
  zoom 
}: IMapProps) => {
  const loadKakaoMap = () => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat ?? DEFAULT_LAT, lng ?? DEFAULT_LNG),
        level: zoom ?? DEFAULT_ZOOM,
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