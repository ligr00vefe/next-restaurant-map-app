'use client';

import Map from "@/components/map/Map";
import Markers from "@/components/map/Markers";
import StoreBox from "@/components/map/StoreBox";
import * as stores from '@/data/restaurant_data.json';
import { useState } from "react";

const KakaoMapClient = () => {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores["DATA"];
  console.log('currentStore: ', currentStore);

  return (
    <>
      <Map setMap={setMap} />
      <Markers storeDatas={storeDatas} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  )
}

export default KakaoMapClient