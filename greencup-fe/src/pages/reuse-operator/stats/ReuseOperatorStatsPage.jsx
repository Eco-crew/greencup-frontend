import { useState, useEffect } from "react";

import "./ReuseOperatorStatsPage.css";

import ReuseStatsCurrentTotal from "../../../components/reuse-operator/stats/ReuseStatsCurrentTotal";
import SearchContainer from "../../../components/reuse-operator/stats/search/SearchContainer";
import SearchButton from "../../../components/reuse-operator/util/search-button/SearchButton";
import ReuseStatsPeriodTotal from "../../../components/reuse-operator/stats/ReuseStatsPeriodTotal";
import ReuseStatsPeriodTotalLoanTypes from "../../../components/reuse-operator/stats/ReuseStatsPeriodTotalLoanTypes";

import {
  makeTodayString,
  make7DaysAgoString,
} from "../../../util/utilFunction";

export default function ReuseOperatorStatsPage() {
  //현재 대여 현황
  const [currentTotal, setCurrentTotal] = useState({});
  //조회기간에 따른 대여수, 반납수, 파손 및 분실개수
  const [periodTotal, setPeriodTotal] = useState({});
  //조회기간에 따른 업체이름과, 업체별 대여한 퍼센트비율
  const [periodTotalLoanTypes, setPeriodTotalLoanTypes] = useState([]);

  //<input type="date"> 는 Date 객체가 아니라 문자열 "yyyy-mm-dd" 형태로 값을 다룸
  //조회기간 시작일자 => 디폴트 오늘날짜 - 7
  const todayString = makeTodayString();
  const days7AgoString = make7DaysAgoString(todayString);
  const [startDate, setStartDate] = useState(days7AgoString);
  //조회기간 종료일자 => 디폴트 오늘날짜
  const [endDate, setEndDate] = useState(todayString);

  //fetch로 불러올동안 로딩중 여부
  const [loading, setLoading] = useState(true);
  //검색버튼을 눌렀을때 로딩중 여부
  const [searchLoading, setSearchLoading] = useState(true);

  const startDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const endDateChange = (endDate) => {
    setEndDate(endDate);
  };

  const handleFetchReuseStats = async () => {
    const response = await fetch(
      `/api/reuse-operator/stats?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        credentials: "include", // 세션에 관한 쿠키도 꼭 전송
      },
    );

    if (response.ok) {
      const data = await response.json();
      setCurrentTotal(data.currentTotal);
      setPeriodTotal(data.periodTotal);
      setPeriodTotalLoanTypes(data.periodTotalLoanTypes);

      setLoading(false);
      setSearchLoading(false);
    } else {
      console.log("수거지점장- 통계 불러오기 오류");
    }
  };

  useEffect(() => {
    handleFetchReuseStats();
  }, []);

  //조회버튼을 누를시 수행해야 하는것
  const afterSearchButtonClicked = () => {
    setSearchLoading(true);
    handleFetchReuseStats();
  };

  //여기는 렌더링 하는 영역
  if (loading)
    return (
      <div className="reuse_stats_container">
        <div>로딩중</div>
      </div>
    );
  return (
    <>
      <div className="reuse_stats_container">
        <div className="reuse_stats_title">현재 대여 현황(컵 개수)</div>
        <ReuseStatsCurrentTotal
          currentTotalCount={currentTotal.currentTotalCount}
          currentTotalLoanCount={currentTotal.currentTotalLoanCount}
          currentHaveCount={currentTotal.currentHaveCount}
          totalBrokenLostCount={currentTotal.totalBrokenLostCount}
        />
        <div className="reuse_stats_period_container">
          <SearchContainer
            startDateChange={startDateChange}
            endDateChange={endDateChange}
            startDate={startDate}
            endDate={endDate}
          />
          <SearchButton
            width={100}
            height={50}
            onClick={afterSearchButtonClicked}
          />
        </div>
        <div className="reuse_stats_period_container">
          {searchLoading ? (
            <div>로딩중</div>
          ) : periodTotalLoanTypes.length == 0 ? (
            <>
              <div>데이터가 존재하지 않습니다.</div>
            </>
          ) : (
            <>
              <div className="reuse_stats_period_total">
                <ReuseStatsPeriodTotal
                  periodTotalLoanCount={periodTotal.periodTotalLoanCount}
                  periodTotalReturnCount={periodTotal.periodTotalReturnCount}
                  periodTotalBrokenLostCount={
                    periodTotal.periodTotalBrokenLostCount
                  }
                />
              </div>
              <div className="reuse_stats_period_total_loan_types">
                <ReuseStatsPeriodTotalLoanTypes
                  periodTotalLoanTypes={periodTotalLoanTypes}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
