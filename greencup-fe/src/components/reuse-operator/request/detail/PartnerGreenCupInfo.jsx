import "./PartnerGreenCupInfo.css";

import IsCompleteButton from "../iscomplete-button/IsCompleteButton";

//수거지점장- 요청현황- 상세페이지- 필요개수, 반납개수, 분실개수, 방문시간, 요청일, 완료여부
export default function PartnerGreenCupInfo({
  requestId,
  needCount,
  returnCount,
  brokenLostCount,
  wantedVisitTime,
  requestedDate,
  completed,
  afterCompleted,
  afterCanceled,
}) {
  return (
    <>
      <div
        id="reuse-request-detail-partner-cup-info-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle table-hover custom-table">
          <thead id="table-header" className="table-group-divider fw-normal">
            <tr>
              <th>필요개수</th>
              <th>반납개수</th>
              <th>분실개수</th>
              <th>방문 시간</th>
              <th>요청일</th>
              <th>완료여부</th>
            </tr>
          </thead>
          <tbody id="table-body" className="table-group-divider fw-light">
            <tr>
              <td>{needCount}</td>
              <td>{returnCount}</td>
              <td>{brokenLostCount}</td>
              <td>{wantedVisitTime}</td>
              <td>{requestedDate}</td>
              {completed === true ? (
                <td>
                  <div className="reuse-request-detail-partner-cup-info-isCompleteButtonTd">
                    <span className="reuse-request-detail-partner-cup-info-isCompleteText">
                      완료
                    </span>
                    {/* width, height 크기 조정시 값 변경, text 변경 및 버튼 배경색 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
                    <IsCompleteButton
                      width={50}
                      height={30}
                      text={"취소"}
                      backgroundColor={"red"}
                      dataId={requestId}
                      onClick={(e) => {
                        e.stopPropagation();
                        afterCanceled(e);
                      }}
                    />
                  </div>
                </td>
              ) : (
                <td>
                  <div className="reuse-request-detail-partner-cup-info-isCompleteButtonTd">
                    <span className="reuse-request-detail-partner-cup-info-isCompleteText">
                      미완료
                    </span>
                    {/* width, height 크기 조정시 값 변경, text 변경 및 버튼 배경색 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
                    <IsCompleteButton
                      width={50}
                      height={30}
                      text={"완료"}
                      backgroundColor={"green"}
                      dataId={requestId}
                      onClick={(e) => {
                        e.stopPropagation();
                        afterCompleted(e);
                      }}
                    />
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
