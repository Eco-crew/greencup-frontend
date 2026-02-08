import "./PartnerInfo.css";

//수거지점장- 업체관리- 상세페이지- 공유오피스A 아이콘과 큰이름영역
export default function PartnerInfo({ partnerName }) {
  return (
    <>
      <div className="reuse_partner_manage_detail_partner_info">
        {/* 백그라운드로 이미지 넣기 */}
        <div className="reuse_partner_manage_detail_partner_img"></div>
        <div className="reuse_partner_manage_detail_partner_name">{partnerName}</div>
      </div>
    </>
  );
}
