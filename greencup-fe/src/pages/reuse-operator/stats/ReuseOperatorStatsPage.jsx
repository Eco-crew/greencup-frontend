import { useState, useEffect } from "react";

import "./ReuseOperatorStatsPage.css";

import ReuseStatsCurrentTotal from "../../../components/reuse-operator/stats/ReuseStatsCurrentTotal";
import ReuseStatsPeriodTotal from "../../../components/reuse-operator/stats/ReuseStatsPeriodTotal";

import { fetchReuseStats } from "../../../api/dummyReuseStats";

export default function ReuseOperatorStatsPage() {
  //현재 대여 현황
  const [currentTotal, setCurrentTotal] = useState({});
  //조회기간에 따른 대여수, 반납수, 파손 및 분실개수
  const [periodTotal, setPeriodTotal] = useState({});
  //조회기간에 따른 업체이름과, 업체별 대여한 퍼센트비율
  const [periodTotalLoanTypes, setPeriodTotalLoanTypes] = useState({});

  //조회기간 시작일자
  const [startDate, setStartDate] = useState("");
  //조회기간 종료일자
  const [endDate, setEndDate] = useState("");

  const startDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const endDateChange = (startDate) => {
    setEndDate(startDate);
  };

  const handleFetchReuseStats = () => {
    fetchReuseStats().then((data) => {
      setCurrentTotal(data.currentTotal);
      setPeriodTotal(data.periodTotal);
      setPeriodTotalLoanTypes(data.periodTotalLoanTypes);
    });
  };

  useEffect(() => {
    handleFetchReuseStats();
  }, []);

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
          <div className="reuse_stats_period_total">
            <ReuseStatsPeriodTotal
              periodTotalLoanCount={periodTotal.periodTotalLoanCount}
              periodTotalReturnCount={periodTotal.periodTotalReturnCount}
              periodTotalBrokenLostCount={
                periodTotal.periodTotalBrokenLostCount
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
