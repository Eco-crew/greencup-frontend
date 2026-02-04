import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Table.css";

import IsCompleteButton from "../../iscomplete-button/IsCompleteButton";

import {
  REQUEST_ID,
  NEED_COUNT,
  RETURN_COUNT,
  BROKEN_LOST_COUNT,
  PARTNER_NAME,
  WANTED_VISIT_TIME,
  REQUESTED_DATE,
  REQUEST_COMPLETED,
} from "../../../../../util/constant";

//수거지점장- 요청현황 검색결과 데이터 테이블
export default function Table({ requests, afterCompleted, afterCanceled }) {
  const navigate = useNavigate();
  //렌더링할 헤더 내용 저장
  const [realHeaders, setRealHeaders] = useState([]);
  //렌더링할 td 내용을 모은 tr 내용 저장
  const [realTrs, setRealTrs] = useState([]);
  //tr을 구분하는데 쓸 id 저장(상세 페이지 이동시 필요)
  const [realTrIds, setRealTrIds] = useState([]);

  const trClick = (e) => {
    navigate(`/reuse-operator/requests/${e.target.dataset.id}`);
  };

  useEffect(() => {
    if (!requests || requests.length === 0) {
      setRealHeaders([]);
      return;
    }

    const headers = Object.keys(requests[0]);
    const tmpHeaders = [];

    headers.forEach((h) => {
      switch (h) {
        case REQUEST_ID:
          break;
        case NEED_COUNT:
          tmpHeaders.push("필요 개수");
          break;
        case RETURN_COUNT:
          tmpHeaders.push("반납 개수");
          break;
        case BROKEN_LOST_COUNT:
          tmpHeaders.push("분실 개수");
          break;
        case PARTNER_NAME:
          tmpHeaders.push("업체명");
          break;
        case WANTED_VISIT_TIME:
          tmpHeaders.push("방문 시간");
          break;
        case REQUESTED_DATE:
          tmpHeaders.push("요청일");
          break;
        case REQUEST_COMPLETED:
          tmpHeaders.push("완료여부");
          break;
        default:
          break;
      }
    });

    setRealHeaders(tmpHeaders);

    const tmpTrs = [];
    const tmpTrIds = [];
    requests.forEach((row) => {
      const tmpTds = [];
      for (const [key, value] of Object.entries(row)) {
        //행을 구분짓는 requestId를 따로 저장
        if (key === REQUEST_ID) {
          tmpTrIds.push(value);
        } else if (key === REQUEST_COMPLETED) {
          if (value) {
            tmpTds.push("완료");
          } else {
            tmpTds.push("미완료");
          }
        } else {
          tmpTds.push(value);
        }
      }
      tmpTrs.push(tmpTds);
    });

    setRealTrs(tmpTrs);
    setRealTrIds(tmpTrIds);
  }, [requests]);

  return (
    <>
      <div id="search-table" className="text-center table-responsive">
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle table-hover custom-table">
          <thead id="table-header" className="table-group-divider fw-normal">
            <tr>
              {realHeaders.map((rh) => (
                <th key={rh}>{rh}</th>
              ))}
            </tr>
          </thead>
          <tbody id="table-body" className="table-group-divider fw-light">
            {realTrs.map((rt, index) => (
              <tr
                key={realTrIds[index]}
                data-id={realTrIds[index]}
                onClick={(e) => {
                  trClick(e);
                }}
              >
                {rt.map((rd, index2) =>
                  index2 !== rt.length - 1 ? (
                    <td key={index2}>{rd}</td>
                  ) : rd === "완료" ? (
                    <td key={index2}>
                      <div className="isCompleteButtonTd">
                        <span className="isCompleteText">{rd}</span>
                        {/* width, height 크기 조정시 값 변경, text 변경 및 버튼 배경색 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
                        <IsCompleteButton
                          width={50}
                          height={30}
                          text={"취소"}
                          backgroundColor={"red"}
                          dataId={realTrIds[index]}
                          onClick={(e) => {
                            e.stopPropagation();
                            afterCanceled(e);
                          }}
                        />
                      </div>
                    </td>
                  ) : (
                    <td key={index2}>
                      <div className="isCompleteButtonTd">
                        <span className="isCompleteText">{rd}</span>
                        {/* width, height 크기 조정시 값 변경, text 변경 및 버튼 배경색 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
                        <IsCompleteButton
                          width={50}
                          height={30}
                          text={"완료"}
                          backgroundColor={"green"}
                          dataId={realTrIds[index]}
                          onClick={(e) => {
                            e.stopPropagation();
                            afterCompleted(e);
                          }}
                        />
                      </div>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
