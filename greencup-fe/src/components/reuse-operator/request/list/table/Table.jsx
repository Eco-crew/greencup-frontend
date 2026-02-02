import { useEffect, useState } from "react";
import "./Table.css";

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
export default function Table({ requests }) {
  const [realHeaders, setRealHeaders] = useState([]);

  useEffect(() => {
    if (!requests || requests.length === 0) {
      setRealHeaders([]);
      return;
    }

    const headers = Object.keys(requests[0]);
    const tmp_headers = [];

    headers.forEach((h) => {
      switch (h) {
        case REQUEST_ID:
          break;
        case NEED_COUNT:
          tmp_headers.push("필요 개수");
          break;
        case RETURN_COUNT:
          tmp_headers.push("반납 개수");
          break;
        case BROKEN_LOST_COUNT:
          tmp_headers.push("분실 개수");
          break;
        case PARTNER_NAME:
          tmp_headers.push("업체명");
          break;
        case WANTED_VISIT_TIME:
          tmp_headers.push("방문 시간");
          break;
        case REQUESTED_DATE:
          tmp_headers.push("요청일");
          break;
        case REQUEST_COMPLETED:
          tmp_headers.push("완료여부");
          break;
        default:
          break;
      }
    });

    setRealHeaders(tmp_headers);
  }, [requests]);

  return (
    <>
      <div id="search-table" className="text-center">
        <table className="table align-middle table-hover custom-table">
          <thead id="table-header" className="table-group-divider fw-normal">
            <tr>
            {realHeaders.map((rh) => (
              <th key={rh}>{rh}</th>
            ))}
            </tr>
          </thead>
          <tbody
            id="table-body"
            className="table-group-divider fw-light"
          ></tbody>
        </table>
      </div>
    </>
  );
}
