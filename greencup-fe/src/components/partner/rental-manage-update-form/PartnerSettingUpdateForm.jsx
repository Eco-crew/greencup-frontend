import "./PartnerSettingUpdateForm.css";

//업체지점장-대여관리-기본설정 구역-수정 박스
export default function PartnerSettingUpdateForm({
  defaultNeedCount,
  defaultReturnCount,
  defaultVisitTime,
  onChange,
}) {
  return (
    <>
      <div
        id="partner-rental-manage-partner-setting-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle custom-table">
          <thead
            id="partner-rental-manage-partner-setting-table-header"
            className="table-group-divider fw-normal"
          >
            <tr>
              <th>기본 대여 수</th>
              <th>기본 반납 수</th>
              <th>방문 시간</th>
            </tr>
          </thead>
          <tbody
            id="partner-rental-manage-partner-setting-table-body"
            className="table-group-divider fw-light"
          >
            <tr>
              <td><input id="partner-rental-manage-form-default-need-count" className="partner-rental-manage-partner-setting-input" value={defaultNeedCount} name={"defaultNeedCount"} onChange={(e)=>{onChange(e)}}/></td>
              <td><input id="partner-rental-manage-form-default-return-count" className="partner-rental-manage-partner-setting-input" value={defaultReturnCount} name={"defaultReturnCount"} onChange={(e)=>{onChange(e)}}/></td>
              <td><input id="partner-rental-manage-form-default-visit-time" className="partner-rental-manage-partner-setting-input" value={defaultVisitTime} name={"defaultVisitTime"} onChange={(e)=>{onChange(e)}}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
