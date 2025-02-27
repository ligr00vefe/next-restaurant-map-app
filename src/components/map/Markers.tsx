'use client';

import { useCallback, useEffect } from 'react'
import styles from './Markers.module.scss';
import { IStoreType } from '@/interface';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentStoreState, locationState, mapState } from '@/atom';

const Markers = ({ storeDatas }: { storeDatas: IStoreType[]}) => {
  const map = useRecoilValue(mapState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const [location, setLocation] = useRecoilState(locationState);

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      // 식당 데이터 마커 띄우기
      storeDatas?.map((store) => {
        // 마커이미지 주소  
        const imageSrc = store?.category
          ? `/images/markers/${store?.category}.png`
          : "/images/markers/default.png";

        // 마커이미지의 크기
        const imageSize = new window.kakao.maps.Size(40, 40); 
        // 마커이미지의 옵션, 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        const imageOption = {offset: new window.kakao.maps.Point(27, 69)}; 
          
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc, 
          imageSize, 
          imageOption
        );

        // 마커가 표시될 위치 
        const markerPosition  = new window.kakao.maps.LatLng(
          store?.lat, 
          store?.lng
        ); 
       
        // 마커 생성
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);

        // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
        const content = `<div class=${styles.infowindow}>${store?.name}</div>`;
      
        // 커스텀 오버레이 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'mouseover', function() {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
            customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'mouseout', function() {
            // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
            customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, 'click', function() {
          setCurrentStore(store);
          setLocation({
            ...location,
            lat: store?.lat,
            lng: store?.lng,
          });
        })
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, storeDatas]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return (
    <></>
  )
}

export default Markers