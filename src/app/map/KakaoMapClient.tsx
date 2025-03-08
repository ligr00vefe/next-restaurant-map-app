'use client';

import CurrentLocationButton from "@/components/map/CurrentLocationButton";
import Map from "@/components/map/Map";
import Markers from "@/components/map/Markers";
import StoreBox from "@/components/map/StoreBox";
import { IStoreType } from "@/interface";
import axios from "axios";
import { useEffect, useState } from "react";


const KakaoMapClient = () => {
  const [stores, setStores] = useState<IStoreType[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios('/api/stores');
        setStores(res.data);
      } catch (error) {
        console.error("식당 데이터를 불러오는 중 오류 발생:", error);
      }
    };
  
    fetchStores();
  }, []);

  return (
    <>
      <Map />
      <Markers storeDatas={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  )
}

export default KakaoMapClient