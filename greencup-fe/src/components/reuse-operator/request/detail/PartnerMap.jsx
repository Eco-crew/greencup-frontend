import { useRef, useEffect } from "react";

import "./PartnerMap.css";

//수거지점장- 요청현황- 상세페이지- 지도 API 구역
export default function PartnerMap({ partnerAddress }) {
    //인스턴스를 useRef로 쓰는이유 => 값을 변경해도 리렌더를 안하고, 즉시 접근가능
  const mapRef = useRef(null); // 지도 div
  const mapObjRef = useRef(null); // kakao.maps.Map 인스턴스
  const markerRef = useRef(null); // Marker 인스턴스
  const infoRef = useRef(null); // InfoWindow 인스턴스
  const geocoderRef = useRef(null); // Geocoder 인스턴스

  // 1) 지도 최초 생성 (한 번만)
  useEffect(() => {
    // kakao sdk가 index.html에 이미 로드되어 있어야 함
    if (!window.kakao || !window.kakao.maps) {
        console.log('!window.kakao || !window.kakao.maps');
        return;
    }

    window.kakao.maps.load(() => {
      const kakao = window.kakao;

      // 지도 생성
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      mapObjRef.current = new kakao.maps.Map(mapRef.current, mapOption);

      // geocoder 준비
      // (libraries=services 없으면 여기서 에러/undefined 날 수 있음)
      geocoderRef.current = new kakao.maps.services.Geocoder();
    });
  }, []);

  // 2) partnerAddress가 들어오거나 변경될 때마다 주소 검색
  useEffect(() => {
    if (!partnerAddress) return;
    if (!window.kakao || !window.kakao.maps) return;

    // 지도/지오코더가 아직 준비 안 되었을 수도 있으니 load 안에서 보장
    window.kakao.maps.load(() => {
      const kakao = window.kakao;

      const map = mapObjRef.current;
      const geocoder = geocoderRef.current;

      if (!map || !geocoder) return;

      geocoder.addressSearch(partnerAddress, (result, status) => {
        if (status !== kakao.maps.services.Status.OK || !result?.length) {
          console.warn("주소 검색 실패:", partnerAddress, status);
          return;
        }

        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 기존 마커/인포윈도우 제거(갱신)
        if (markerRef.current) markerRef.current.setMap(null);
        if (infoRef.current) infoRef.current.close();

        // 새 마커
        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });
        markerRef.current = marker;

        // 인포윈도우 (원하면 partnerAddress나 업체명으로 바꿔도 됨)
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:220px;text-align:center;padding:6px 8px;">
                      ${partnerAddress}
                    </div>`,
        });
        infowindow.open(map, marker);
        infoRef.current = infowindow;

        // 중심 이동
        map.setCenter(coords);
      });
    });
  }, [partnerAddress]);

  return (
    <>
      <div className="reuse_request_detail_partnermap_container">
        <div className="reuse_request_detail_partner_address">
          주소 : {partnerAddress}
        </div>
        <div id="reuse_request_detail_partner_map" ref={mapRef}></div>
      </div>
    </>
  );
}
