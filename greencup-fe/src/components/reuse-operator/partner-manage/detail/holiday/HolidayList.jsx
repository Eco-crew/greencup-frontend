import { useState, useEffect } from "react";
import "./HolidayList.css";

import HolidayPagination from "../../../../holiday-pagination/HolidayPagination";

import { SHOW_OFF_DATES_SIZE } from "../../../../../util/constant";
import { use } from "react";

//수거지점장- 업체관리-상세페이지-휴무일 리스트
export default function HolidayList({ offDates }) {
  //비정기 휴무일 총 갯수
  const [offDatesTotalCount, setOffDatesTotalCount] = useState(0);
  //비정기 휴무일에서 현재 페이지
  const [page, setPage] = useState(1);
  //현재 페이지에 따른 보여줄 비정기 휴무일
  // => 여기는 다른 리스트와 달리 캘린더때문에 정기휴무일을 부모에서 한번에 모두 불러오는 구조
  const [showOffDates, setShowOffDates] = useState([]);

  //마운트될때 총 비정기 휴무일 갯수와 보여줄 비정기휴무들 세팅
  useEffect(() => {
    setOffDatesTotalCount(offDates.length);
  }, [offDates]);

  //마운트 이후 총 비정기 휴무일 갯수 세팅이후 보여줄 비정기 휴무들 세팅
  useEffect(() => {
    let tmpOffDates = offDates.slice(
      (page - 1) * SHOW_OFF_DATES_SIZE,
      page * SHOW_OFF_DATES_SIZE,
    );

    //console.log(tmpOffDates);
    setShowOffDates(tmpOffDates);
  }, [offDatesTotalCount]);

  //페이지숫자가 바뀔때마다 보여줄 비정기휴무들 세팅
  useEffect(() => {
    let tmpOffDates = offDates.slice(
      (page - 1) * SHOW_OFF_DATES_SIZE,
      page * SHOW_OFF_DATES_SIZE,
    );
    setShowOffDates(tmpOffDates);
  }, [page]);

  //페이지네이션 버튼 클릭시 실행
  const afterPaginationClicked = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="reuse-partner-manage-holiday-list-container">
        <div className="reuse-partner-manage-holiday-list">
          {showOffDates.map((date) => (
            <div key={date} className="reuse-partner-manage-holiday-element">
              {date}
            </div>
          ))}
        </div>
        <HolidayPagination
          totalCount={offDatesTotalCount}
          page={page}
          afterPaginationClicked={afterPaginationClicked}
        />
      </div>
    </>
  );
}
