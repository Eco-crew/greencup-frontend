import { useEffect, useRef } from "react";

import "./HolidayCalendar.css";

//수거지점장- 업체관리-상세페이지-휴무캘린더
export default function HolidayCalendar() {
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const allowed = ["2026-02-06", "2026-02-10", "2026-02-14"];

  useEffect(() => {
    const fp = window.flatpickr(inputRef.current, {
      inline: true, //캘린더 항상 열림
      clickOpens: false, //클릭해도 date picker 동작(선택 UI) 안 열림
      allowInput: false, //직접 입력 막기
      mode: "multiple", //여러 날짜 선택 모드
      enable: allowed, //이 날짜만 활성(나머지는 비활성)
      dateFormat: "Y-m-d", //4자리 연도, 2자리 월, 2자리 일
      defaultDate: allowed, //처음 보여줄 날짜들
      appendTo: wrapRef.current, //달력 DOM이 이 div 안으로 들어감
    });
    return () => fp.destroy();
  }, []);

  return (
    <>
      <div ref={wrapRef} className="reuse-partner-manage-holiday-calendar-container">
        <input id="reuse-partner-manage-holiday-calendar" ref={inputRef} readOnly/>
      </div>
    </>
  );
}
