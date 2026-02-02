import { useState, useEffect } from "react";

import "./ReuseOperatorRequestPage.css";
import PercentBar from "../../../components/reuse-operator/request/percentbar/PercentBar";
import SearchContainer from "../../../components/reuse-operator/request/search/SearchContainer";
import SearchButton from "../../../components/reuse-operator/util/search-button/SearchButton";
import TabBar from "../../../components/reuse-operator/request/tabbar/TabBar";

import { TOTAL, COMPLETED, NOTCOMPLETED } from "../../../util/constant";

export default function ReuseOperatorRequestPage() {
  //로그인한 수거지점장에게 온 전체 요청갯수
  const [totalRequest, setTotalRequest] = useState(0);
  //로그인한 수거지점장이 완료한 요청갯수
  const [completedRequest, setCompletedRequest] = useState(0);
  //조회기간 시작일자
  const [startDate, setStartDate] = useState("");
  //조회기간 종료일자
  const [endDate, setEndDate] = useState("");
  //제휴지점명
  const [partnerName, setPartnerName] = useState("");
  //선택한 탭바 내용
  const [tabBarContent, setTabBarContent] = useState("");

  const startDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const endDateChange = (startDate) => {
    setEndDate(startDate);
  };

  const partnerNameChange = (partnerName) => {
    setPartnerName(partnerName);
  };

  const tabBarClicked = (e) => {
    switch (e.target.id) {
      case "tab_total":
        setTabBarContent(TOTAL);
        break;
      case "tab_completed":
        setTabBarContent(COMPLETED);
        break;
      case "tab_notcompleted":
        setTabBarContent(NOTCOMPLETED);
        break;
      default:
        console.log("tabbar clicked error");
    }
  };

  useEffect(() => {
    //fetch로 전체, 완료 갯수를 불러오기
  }, []);

  useEffect(() => {
    //console.log(startDate);
  }, [startDate]);

  useEffect(() => {
    //console.log(endDate);
  }, [endDate]);

  useEffect(() => {
    //console.log(partnerName);
  }, [partnerName]);

  useEffect(() => {
    console.log(tabBarContent);
  }, [tabBarContent]);

  return (
    <>
      <div className="reuse_request_container">
        <div className="reuse_request_title">수거 현황</div>
        <PercentBar totalRequest={1000} completedRequest={590} />
        <div className="reuse_request_search">
          <SearchContainer
            startDateChange={startDateChange}
            endDateChange={endDateChange}
            partnerNameChange={partnerNameChange}
          />
          {/* width, height 크기 조정시 값 변경, 버튼을 누를시 onClick이라는 함수를 넘겨줌 */}
          <SearchButton width={100} height={100} />
        </div>
        <TabBar tabBarContent={tabBarContent} tabBarClicked={tabBarClicked} />
      </div>
    </>
  );
}
