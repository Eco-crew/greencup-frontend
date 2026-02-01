import { useState } from "react";

import "./ReuseOperatorRequestPage.css";
import PercentBar from "../../../components/reuse-operator/request/percentbar/PercentBar";

export default function ReuseOperatorRequestPage() {
  //로그인한 수거지점장에게 온 전체 요청갯수
  const [totalRequest, setTotalRequest] = useState(0);
  //로그인한 수거지점장이 완료한 요청갯수
  const [completedRequest, setCompletedRequest] = useState(0);

  return (
    <>
      <div className="reuse_request_container">
        <div className="reuse_request_title">수거 현황</div>
        <PercentBar totalRequest={1000} completedRequest={590} />
      </div>
    </>
  );
}
