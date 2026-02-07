import { useState, useEffect } from "react";
import "./HolidayList.css";

import { SHOW_OFF_DATES_BUTTON_BLOCK_SIZE, SHOW_OFF_DATES_SIZE } from "../../../../../util/constant";

//수거지점장- 업체관리-상세페이지-휴무일 리스트
export default function HolidayList({ offDates }) {
    //비정기 휴무일 총 갯수
    const [offDatesTotalCount, setOffDatesTotalCount] = useState(0);
    //비정기 휴무일에서 현재 페이지
    const [page, setPage] = useState(1);
    //현재 페이지에 따른 보여줄 비정기 휴무일
    const [showOffDates, setShowOffDates] = useState([]);

    useEffect(()=>{
        let tmpOffDates = offDates.slice((page - 1) * SHOW_OFF_DATES_SIZE, page * SHOW_OFF_DATES_SIZE);
        setShowOffDates(tmpOffDates);
    },[page]);

    //페이지네이션 버튼 클릭시 실행
    const afterPaginationClicked = (page) => {
        setPage(page);
    }
    
  return (
    <>
      <div className="reuse-partner-manage-holiday-list-container">
        <div className="reuse-partner-manage-holiday-title">휴무일</div>
        <div className="reuse-partner-manage-holiday-list">
          {offDates.map((date) => (
            <div key={date} className="reuse-partner-manage-holiday-element">
              {date}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
