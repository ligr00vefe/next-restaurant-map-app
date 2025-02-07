'use client';

import Map from "@/components/map/Map";
import Markers from "@/components/map/Markers";
import StoreBox from "@/components/map/StoreBox";
import { StoreType } from "@/interface";
import { useEffect, useState } from "react";


const KakaoMapClient = () => {
  const [stores, setStores] = useState<StoreType[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
      const data = await res.json();

      setStores(data);
    };

    fetchStores();
  }, []);

  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores;
  console.log('stores: ', stores);
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