import { useState, useEffect } from "react";
import "./HolidayListUpdateForm.css";

import HolidayPagination from "../../holiday-pagination/HolidayPagination";
import { SHOW_OFF_DATES_SIZE } from "../../../util/constant";

//업체지점장-대여관리-수정폼-휴무일 리스트
export default function HolidayListUpdateForm({ updateOffDates }) {
  //비정기 휴무일 총 갯수
  const [offDatesTotalCount, setOffDatesTotalCount] = useState(0);
  //비정기 휴무일에서 현재 페이지
  const [page, setPage] = useState(1);
  //현재 페이지에 따른 보여줄 비정기 휴무일
  // => 여기는 다른 리스트와 달리 캘린더때문에 정기휴무일을 부모에서 한번에 모두 불러오는 구조
  const [showOffDates, setShowOffDates] = useState([]);

  //마운트될때 총 비정기 휴무일 갯수와 보여줄 비정기휴무들 세팅
  useEffect(() => {
    setOffDatesTotalCount(updateOffDates.length);
  }, [updateOffDates]);

  //마운트 이후 총 비정기 휴무일 갯수 세팅이후 보여줄 비정기 휴무들 세팅
  useEffect(() => {
    let tmpOffDates = updateOffDates.slice(
      (page - 1) * SHOW_OFF_DATES_SIZE,
      page * SHOW_OFF_DATES_SIZE,
    );

    //console.log(tmpOffDates);
    setShowOffDates(tmpOffDates);
  }, [offDatesTotalCount]);

  //페이지숫자가 바뀔때마다 보여줄 비정기휴무들 세팅
  useEffect(() => {
    let tmpOffDates = updateOffDates.slice(
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
      <div className="partner-rental-manage-holiday-list-container">
        <div className="partner-rental-manage-holiday-list">
          {showOffDates.map((date) => (
            <>
              <div key={date} className="partner-rental-manage-holiday-row">
                <div className="partner-rental-manage-holiday-element">
                  {date}
                </div>

                <button
                  type="button"
                  className="partner-rental-manage-holiday-remove"
                  aria-label={`${date} 삭제`}
                  onClick={() => onRemoveDate(date)} // 너가 가진 삭제함수로 연결
                />
              </div>
            </>
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
