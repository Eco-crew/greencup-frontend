import "./PartnerSetting.css";

//수거지점장-업체관리- 상세페이지- 기본설정 구역
export default function PartnerSetting({
  defaultNeedCount,
  defaultReturnCount,
  defaultVisitTime,
}) {
  return (
    <>
      <div
        id="reuse-partner-manage-detail-partner-setting-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle custom-table">
          <thead
            id="reuse-partner-manage-detail-partner-setting-table-header"
            className="table-group-divider fw-normal"
          >
            <tr>
              <th>대여 수</th>
              <th>반납 수</th>
              <th>방문 시간</th>
            </tr>
          </thead>
          <tbody
            id="reuse-partner-manage-detail-partner-setting-table-body"
            className="table-group-divider fw-light"
          >
            <tr>
              <td>{defaultNeedCount}</td>
              <td>{defaultReturnCount}</td>
              <td>{defaultVisitTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
