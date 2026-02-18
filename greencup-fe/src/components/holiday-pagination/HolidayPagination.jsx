import { useState, useEffect } from "react";

import "./HolidayPagination.css";

import {SHOW_OFF_DATES_SIZE } from "../../util/constant";

//페이지네이션 버튼 구역
export default function HolidayPagination({
  totalCount,
  page,
  afterPaginationClicked,
}) {
  //   //전체 게시글 개수에 대한 전체 페이지수 구하기
  //   const [totalPages, setTotalPages] = useState(0);
  //   //이전버튼 존재여부
  //   const [prevButton, setPrevButton] = useState(false);
  //   //다음버튼 존재여부
  //   const [nextButton, setNextButton] = useState(false);

  //현재 페이지에서 보여질 모든버튼을 저장하는 리스트
  const [buttonList, setButtonList] = useState([]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(totalCount / SHOW_OFF_DATES_SIZE));
    //setTotalPages(totalPages);

    let prevButton = false;
    let nextButton = false;

    if (page > 1){
      prevButton = true;
    }

    if (page < totalPages){
      nextButton = true;
    }
    
    // setPrevButton(prevButton);
    // setNextButton(nextButton);

    //임의 테스트
    //prevButton = true;
    //nextButton = true;

    const buttonList = [];
    if (prevButton) {
      buttonList.push(
        <li className="page-item" key={page - 1}>
          <a
            className="page-link"
            key={page - 1}
            onClick={() => afterPaginationClicked(page - 1)}
          >
            &lt;이전
          </a>
        </li>,
      );
    }
  
    if (nextButton) {
      buttonList.push(
        <li className="page-item" key={page + 1}>
          <a
            className="page-link"
            key={page + 1}
            onClick={() => afterPaginationClicked(page + 1)}
          >
            다음&gt;
          </a>
        </li>,
      );
    }

    setButtonList(buttonList);
  }, [totalCount, page]);

  return (
    <>
      <ul className="holiday-pagination pagination justify-content-center">{buttonList}</ul>
    </>
  );
}
