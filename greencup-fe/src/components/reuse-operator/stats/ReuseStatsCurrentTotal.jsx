import "./ReuseStatsCurrentTotal.css";

//수거지점장-통계- 현재 대여 현황
export default function ReuseStatsCurrentTotal({
  currentTotalCount,
  currentTotalLoanCount,
  currentHaveCount,
  totalBrokenLostCount
}) {
  return (
    <>
      <div
        id="reuse-stats-current-total-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle table-hover custom-table">
          <thead
            id="reuse-stats-current-total-table-header"
            className="table-group-divider fw-normal"
          >
            <tr>
              <th>전체</th>
              <th>대여 중</th>
              <th>보유</th>
              <th>파손 및 분실</th>
            </tr>
          </thead>
          <tbody
            id="reuse-stats-current-total-table-body"
            className="table-group-divider fw-light"
          >
            <tr>
              <td>{currentTotalCount}</td>
              <td>{currentTotalLoanCount}</td>
              <td>{currentHaveCount}</td>
              <td>{totalBrokenLostCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
