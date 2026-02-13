import "./SearchContainer.css";

//수거지점장- 요청현황- 조회기간과 제휴 지점명 조회 검색박스
export default function SearchContainer({
  startDateChange,
  endDateChange,
  startDate,
  endDate,
}) {
  return (
    <>
      <div className="reuse_stats_search_container">
        <div className="reuse_stats_search_sub_container">
          <div className="reuse_stats_search_element">조회 기간</div>
          <div className="reuse_stats_search_element">
            <input
              id="reuse_request_start_date"
              type="date"
              value={startDate}
              onChange={(e) => {
                startDateChange(e.target.value);
              }}
            />
            <span>~</span>
            <input
              id="reuse_request_end_date"
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
