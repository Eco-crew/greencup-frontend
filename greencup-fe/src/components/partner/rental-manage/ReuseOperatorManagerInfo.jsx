import { useState, useEffect } from "react";

import "./ReuseOperatorManagerInfo.css";

//import { makePhoneNumberHyphen } from "../../../../util/utilFunction";

//업체지점장-대여관리- 수거지점이름, 수거지점장 이름, 연락처 영역
export default function ReuseOperatorManagerInfo({
  reuseOperatorName,
  reuseOperatorManagerName,
  reuseOperatorManagerPhone,
}) {
  //const [phoneNumber, setPhoneNumber] = useState("");
  //핸드폰 번호에 - 삽입
  //   useEffect(() => {
  //     if (partnerManagerPhone) {
  //       setPhoneNumber(makePhoneNumberHyphen(partnerManagerPhone));
  //     }
  //   }, [partnerManagerPhone]);
  return (
    <>
      <div
        id="partner-rental-manage-reuse-manager-table"
        className="text-center table-responsive"
      >
        {/* 감싸는 상위태그에 table-responsive만으로도 스크롤이 생기지 않음 table태그에 직접적으로 min-width필요*/}
        <table className="table align-middle custom-table">
          <thead
            id="partner-rental-manage-reuse-manager-table-header"
            className="table-group-divider fw-normal"
          >
            <tr>
              <th>수거 지점명</th>
              <th>수거 지점장 이름</th>
              <th>수거 지점장 연락처</th>
            </tr>
          </thead>
          <tbody
            id="partner-rental-manage-reuse-manager-table-body"
            className="table-group-divider fw-light"
          >
            <tr>
              <td>{reuseOperatorName}</td>
              <td>{reuseOperatorManagerName}</td>
              <td>{reuseOperatorManagerPhone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
