'use client';

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
      const res = await axios('/api/stores');
      setStores(res.data);
    };
    fetchStores();
  }, []);

  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  // console.log('stores: ', stores);
  // console.log('currentStore: ', currentStore);

  return (
    <>
      <Map setMap={setMap} />
      <Markers storeDatas={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  )
}

export default KakaoMapClient