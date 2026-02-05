import './PartnerInfo.css';

//수거지점장- 요청현황- 상세페이지- 공유오피스A 아이콘과 큰이름영역
export default function PartnerInfo({partnerName}){
    return(
        <>
        <div className="reuse_request_detail_partner_info">
            {/* 백그라운드로 이미지 넣기 */}
            <div className="reuse_request_detail_partner_img"></div>
            <div className="reuse_request_detail_partner_name">{partnerName}</div>
        </div>
        </>
    );
}