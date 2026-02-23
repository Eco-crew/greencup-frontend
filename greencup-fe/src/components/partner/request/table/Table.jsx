import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Table.css";

import RequestCancelButton from "../../util/request-cancel-button/RequestCancelButton";

import {
  REQUEST_ID,
  NEED_COUNT,
  RETURN_COUNT,
  BROKEN_LOST_COUNT,
  WANTED_VISIT_TIME,
  REQUESTED_DATE,
  REQUESTED_STATUS,
  REQUEST_REQUESTING,
  REQUEST_COMPLETED,
  REQUEST_CANCELLED,
} from "../../../../util/constant";

//업체지점장- 대여기록 검색결과 데이터 테이블
export default function Table({ requests, afterCanceled }) {
  const navigate = useNavigate();
  //렌더링할 헤더 내용 저장
  const [realHeaders, setRealHeaders] = useState([]);
  //렌더링할 td 내용을 모은 tr 내용 저장
  const [realTrs, setRealTrs] = useState([]);
  //tr을 구분하는데 쓸 id 저장 => 여기서 상세페이지 이동은 하지 않음
  const [realTrIds, setRealTrIds] = useState([]);

  useEffect(() => {
    if (!requests || requests.length === 0) {
      setRealHeaders([]);
      setRealTrs([]);
      setRealTrIds([]);

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
          tmpHeaders.push("반납할 개수");
          break;
        case BROKEN_LOST_COUNT:
          tmpHeaders.push("파손 및 분실 개수");
          break;
        case WANTED_VISIT_TIME:
          tmpHeaders.push("방문 시간");
          break;
        case REQUESTED_DATE:
          tmpHeaders.push("요청일");
          break;
        case REQUESTED_STATUS:
          tmpHeaders.push("진행상태");
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
        } else if (key === REQUESTED_STATUS) {
          if (value === REQUEST_REQUESTING) {
            tmpTds.push("요청중");
          } else if (value === REQUEST_COMPLETED) {
            tmpTds.push("완료");
          } else {
            tmpTds.push("취소");
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

  if (requests.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        현재 데이터 조회 결과는 존재하지 않습니다.
      </div>
    );
  }
  return (
    <>
      <div
        id="partner-request-search-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle table-hover custom-table">
          <thead
            id="partner-request-table-header"
            className="table-group-divider fw-normal"
          >
            <tr>
              {realHeaders.map((rh) => (
                <th key={rh}>{rh}</th>
              ))}
            </tr>
          </thead>
          <tbody
            id="partner-request-table-body"
            className="table-group-divider fw-light"
          >
            {realTrs.map((rt, index) => (
              <tr key={realTrIds[index]} data-id={realTrIds[index]}>
                {rt.map((rd, index2) =>
                  index2 !== rt.length - 1 ? (
                    <td key={index2}>{rd}</td>
                  ) : rd === "요청중" ? (
                    <td key={index2}>
                      <div className="partner-request-requestCancelButtonTd">
                        <span className="partner-request-requestCancelText">
                          {rd}
                        </span>
                        {/* width, height 크기 조정시 값 변경, text 변경 및 버튼 배경색 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
                        <RequestCancelButton
                          width={60}
                          height={30}
                          text={"취소"}
                          backgroundColor={"#E98F8F"}
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
                      <div className="partner-request-requestCancelButtonTd">
                        <span className="partner-request-requestCancelText">
                          {rd}
                        </span>
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
