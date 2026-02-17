import "./PartnerMessage.css";

//업체지점장- 대여관리- 비고 메시지
export default function PartnerMessage({ memo }) {
  return (
    <>
      <div className="parter_rental_manage_partner_message_container">
        <div id="parter_rental_manage_partner_message">{memo}</div>
      </div>
    </>
  );
}
