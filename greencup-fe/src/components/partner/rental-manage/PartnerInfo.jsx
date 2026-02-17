import "./PartnerInfo.css";

//업체지점장- 대여관리- 공유오피스A 아이콘과 큰이름영역
export default function PartnerInfo({ partnerName, partnerManagerName }) {
  return (
    <>
      <div className="partner_rental_manage_partner_info">
        {/* 백그라운드로 이미지 넣기 */}
        <div className="partner_rental_manage_partner_img"></div>
        <div className="partner_rental_manage_partner_name_container">
          <div className="partner_rental_manage_partner_name">
            {partnerName}
          </div>
          <div className="partner_rental_manage_partner_manager_name">
            {partnerManagerName}
          </div>
        </div>
      </div>
    </>
  );
}
