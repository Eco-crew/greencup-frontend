import "./PartnerMessageUpdateForm.css";

//업체지점장- 대여관리- 비고 메시지
export default function PartnerMessageUpdateForm({ memo, onChange }) {
  return (
    <>
      <div className="parter_rental_manage_partner_message_container">
        <div id="parter_rental_manage_partner_message">
            <textarea id="partner-rental-manage-form-memo" className="partner-rental-manage-memo-input" value={memo} name={"memo"} onChange={(e)=>{onChange(e)}}></textarea>
        </div>
      </div>
    </>
  );
}
