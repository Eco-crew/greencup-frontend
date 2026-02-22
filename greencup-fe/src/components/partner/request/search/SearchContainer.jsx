import "./SearchContainer.css";

//업체지점장- 요청현황- 조회기간 조회 검색박스
export default function SearchContainer({
  startDateChange,
  endDateChange,
  startDate,
  endDate,
}) {
  return (
    <>
      <div className="partner_requests_search_container">
        <div className="partner_requests_search_sub_container">
          <div className="partner_requests_search_element">조회 기간</div>
          <div className="partner_requests_search_element">
            <input
              id="partner_requests_start_date"
              type="date"
              value={startDate}
              onChange={(e) => {
                startDateChange(e.target.value);
              }}
            />
            <span>~</span>
            <input
              id="partner_requests_end_date"
              type="date"
              value={endDate}
              onChange={(e) => {
                endDateChange(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
