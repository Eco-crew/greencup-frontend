import "./PartnerManagerInfo.css";

//수거지점장- 업체관리- 상세페이지- 업체이름, 연락처, 업체 운영시간 영역
export default function PartnerManagerInfo({
  partnerManagerName,
  partnerManagerPhone,
  partnerOperatingStart,
  partnerOperaingEnd,
}) {
  return (
    <>
      <div
        id="reuse-partner-manage-detail-partner-manager-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle table-hover custom-table">
          <thead id="reuse-partner-manage-detail-partner-manager-table-header" className="table-group-divider fw-normal">
            <tr>
              <th>업체 지점장 이름</th>
              <th>연락처</th>
              <th>업체 운영시간</th>
            </tr>
          </thead>
          <tbody id="reuse-partner-manage-detail-partner-manager-table-body" className="table-group-divider fw-light">
            <tr>
              <td>{partnerManagerName}</td>
              <td>{partnerManagerPhone}</td>
              <td>
                {partnerOperatingStart}~{partnerOperaingEnd}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
