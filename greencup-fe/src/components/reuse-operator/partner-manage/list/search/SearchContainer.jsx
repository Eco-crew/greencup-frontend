import "./SearchContainer.css";

//수거지점장- 업체관리- 업체명 조회 검색박스
export default function SearchContainer({partnerNameChange}) {
  return (
    <>
      <div className="reuse_partner_search_container">
        <input
          id="reuse_partner_partner_name"
          type="text"
          onChange={(e) => {
            partnerNameChange(e.target.value);
          }}
        />
      </div>
    </>
  );
}
