import "./PartnerMessage.css";

//수거지점장- 업체관리- 상세페이지- 비고 메시지
export default function PartnerMessage({ memo }) {
  return (
    <>
      <div className="reuse_parter_manage_detail_partner_message_container">
        <div id="reuse_parter_manage_detail_partner_message">{memo}</div>
      </div>
    </>
  );
}
