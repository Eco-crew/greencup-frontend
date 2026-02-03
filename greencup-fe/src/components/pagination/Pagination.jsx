import { useState, useEffect } from "react";

import "./Pagination.css";

import { BUTTON_BLOCK_SIZE, SHOW_POSTS_COUNT } from "../../util/constant";

//페이지네이션 버튼 구역
export default function Pagination({
  totalCount,
  page,
  afterPaginationClicked,
}) {
  //   //전체 게시글 개수에 대한 전체 페이지수 구하기
  //   const [totalPages, setTotalPages] = useState(0);
  //   //현재 페이지가 속해있는 블록번호
  //   const [currentButtonBlockNumber, setCurrentButtonBlockNumber] = useState(0);
  //   //현재 속한 블록번호에서 마지막 페이지 숫자
  //   const [endButtonBlockIndex, setEndButtonBlockIndex] = useState(0);
  //   //현재 속한 블록번호에서 첫번째 페이지 숫자
  //   const [startButtonBlockIndex, setStartButtonBlockIndex] = useState(0);
  //   //이전버튼 존재여부
  //   const [prevButton, setPrevButton] = useState(false);
  //   //다음버튼 존재여부
  //   const [nextButton, setNextButton] = useState(false);

  //현재 페이지에서 보여질 모든버튼을 저장하는 리스트
  const [buttonList, setButtonList] = useState([]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(totalCount / SHOW_POSTS_COUNT));
    //setTotalPages(totalPages);

    const currentButtonBlockNumber = Math.ceil(page / BUTTON_BLOCK_SIZE);
    //setCurrentButtonBlockNumber(currentButtonBlockNumber);

    let endButtonBlockIndex = currentButtonBlockNumber * BUTTON_BLOCK_SIZE;
    let startButtonBlockIndex = endButtonBlockIndex - BUTTON_BLOCK_SIZE + 1;
    let prevButton = false;
    let nextButton = false;

    if (startButtonBlockIndex <= 1) {
      startButtonBlockIndex = 1;
    } else {
      prevButton = true;
    }

    if (endButtonBlockIndex >= totalPages) {
      endButtonBlockIndex = totalPages;
    } else {
      nextButton = true;
    }

    // setEndButtonBlockIndex(endButtonBlockIndex);
    // setStartButtonBlockIndex(startButtonBlockIndex);
    // setPrevButton(prevButton);
    // setNextButton(nextButton);

    const buttonList = [];
    if (prevButton) {
      buttonList.push(
        <li className="page-item" key={startButtonBlockIndex - 1}>
          <a
            className="page-link"
            key={startButtonBlockIndex - 1}
            onClick={() => afterPaginationClicked(startButtonBlockIndex - 1)}
          >
            &lt;이전
          </a>
        </li>,
      );
    }
    for (let i = startButtonBlockIndex; i <= endButtonBlockIndex; i++) {
      if (i == page){
         buttonList.push(
        <li className="page-item active" key={i}>
          <a
            className="page-link"
            key={i}
            onClick={() => afterPaginationClicked(i)}
          >
            {i}
          </a>
        </li>,
      );
      } else {
         buttonList.push(
        <li className="page-item" key={i}>
          <a
            className="page-link"
            key={i}
            onClick={() => afterPaginationClicked(i)}
          >
            {i}
          </a>
        </li>,
      );
      }
     
    }
    if (nextButton) {
      buttonList.push(
        <li className="page-item" key={endButtonBlockIndex + 1}>
          <a
            className="page-link"
            key={endButtonBlockIndex + 1}
            onClick={() => afterPaginationClicked(endButtonBlockIndex + 1)}
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
      <ul className="pagination justify-content-center">{buttonList}</ul>
    </>
  );
}
