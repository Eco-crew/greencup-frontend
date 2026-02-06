import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Table.css";

import {
  PARTNER_ID,
  PARTNER_NAME,
  PARTNER_MANAGER_NAME,
  CURRENT_LOAN_COUNT,
} from "../../../../../util/constant";

//수거지점장- 업체관리 검색결과 데이터 테이블
export default function Table({ partners }) {
  const navigate = useNavigate();
  //렌더링할 헤더 내용 저장
  const [realHeaders, setRealHeaders] = useState([]);
  //렌더링할 td 내용을 모은 tr 내용 저장
  const [realTrs, setRealTrs] = useState([]);
  //tr을 구분하는데 쓸 id 저장(상세 페이지 이동시 필요)
  const [realTrIds, setRealTrIds] = useState([]);

  const trClick = (e) => {
    navigate(`/reuse-operator/partner-manage/${e.currentTarget.dataset.id}`);
  };

  useEffect(() => {
    if (!partners || partners.length === 0) {
      setRealHeaders([]);
      return;
    }

    const headers = Object.keys(partners[0]);
    const tmpHeaders = [];

    headers.forEach((h) => {
      switch (h) {
        case PARTNER_ID:
          break;
        case PARTNER_NAME:
          tmpHeaders.push("업체명");
          break;
        case PARTNER_MANAGER_NAME:
          tmpHeaders.push("지점장 이름");
          break;
        case CURRENT_LOAN_COUNT:
          tmpHeaders.push("현재 대여 수");
          break;
        default:
          break;
      }
    });

    setRealHeaders(tmpHeaders);

    const tmpTrs = [];
    const tmpTrIds = [];
    partners.forEach((row) => {
      const tmpTds = [];
      for (const [key, value] of Object.entries(row)) {
        //행을 구분짓는 requestId를 따로 저장
        if (key === PARTNER_ID) {
          tmpTrIds.push(value);
        } else {
          tmpTds.push(value);
        }
      }
      tmpTrs.push(tmpTds);
    });

    setRealTrs(tmpTrs);
    setRealTrIds(tmpTrIds);
  }, [partners]);

  return (
    <>
      <div
        id="reuse-partner-search-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle table-hover custom-table">
          <thead
            id="reuse-partner-table-header"
            className="table-group-divider fw-normal"
          >
            <tr>
              {realHeaders.map((rh) => (
                <th key={rh}>{rh}</th>
              ))}
            </tr>
          </thead>
          <tbody
            id="reuse-partner-table-body"
            className="table-group-divider fw-light"
          >
            {realTrs.map((rt, index) => (
              <tr
                key={realTrIds[index]}
                data-id={realTrIds[index]}
                onClick={(e) => {
                  trClick(e);
                }}
              >
                {rt.map((rd, index2) => (
                  <td key={index2}>{rd}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
