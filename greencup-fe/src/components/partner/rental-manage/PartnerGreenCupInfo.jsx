import './PartnerGreenCupInfo.css';

//업체지점장- 대여관리- 총 대여 수, 총 반납 수, 총 파손 및 분실 수
export default function PartnerGreenCupInfo({
  totalLoanCount,
  totalReturnCount,
  totalBrokenLostCount,
}){
    return(
        <>
         <div
                id="partner-rental-manage-partner-cup-info-table"
                className="text-center table-responsive"
              >
                {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
                <table className="table align-middle custom-table">
                  <thead id="partner-rental-manage-partner-cup-info-table-header" className="table-group-divider fw-normal">
                    <tr>
                      <th>총 대여 수</th>
                      <th>총 반납 수</th>
                      <th>총 파손 및 분실 수</th>
                    </tr>
                  </thead>
                  <tbody id="partner-rental-manage-partner-cup-info-table-body" className="table-group-divider fw-light">
                    <tr>
                      <td>{totalLoanCount}</td>
                      <td>{totalReturnCount}</td>
                      <td>{totalBrokenLostCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
        </>
    );
}