import { useEffect, useRef } from "react";

import "./HolidayCalendarUpdateForm.css";

//업체지점장- 대여관리-수정폼-휴무캘린더
export default function HolidayCalendarUpdateForm({
  updateOffDates,
  onChange,
}) {
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const fpRef = useRef(null);

  useEffect(() => {
    fpRef.current = window.flatpickr(inputRef.current, {
      inline: true, //캘린더 항상 열림
      clickOpens: false, //클릭해도 date picker 동작(선택 UI) 안 열림
      allowInput: true, //직접 입력 허용
      mode: "multiple", //여러 날짜 선택 모드
      dateFormat: "Y-m-d", //4자리 연도, 2자리 월, 2자리 일
      defaultDate: updateOffDates, //처음 보여줄 날짜들
      appendTo: wrapRef.current, //달력 DOM이 이 div 안으로 들어감

      // 날짜 선택될 때 실행
      onChange: function (selectedDates, dateStr, instance) {
        // selectedDates : Date 객체 배열
        // dateStr : 문자열 "2026-02-18, 2026-02-19" 이런형태로 단순히 이어서 온다
        //instance : flatpickr 객체

        // 문자열 배열로 쓰고 싶으면
        const arr = selectedDates.map((d) => instance.formatDate(d, "Y-m-d"));
        //console.log(arr);
        //부모컴포넌트 상태관리변수에 업데이트
        onChange(arr);
      },
    });

    return () => fpRef.current?.destroy();
  }, []);

  //부모의 updateOffDates가 바뀌면 "재생성" 말고 setDate로만 반영
  useEffect(() => {
    const fp = fpRef.current;
    if (!fp) return;

    // false: setDate로 인해 onChange 트리거 X
    fp.setDate(updateOffDates ?? [], false);

    //console.log('calendar에서 updateoffdates 변경');
  }, [updateOffDates]);

  return (
    <>
      <div
        ref={wrapRef}
        className="partner-rental-manage-holiday-calendar-container"
      >
        <input id="partner-rental-manage-holiday-calendar" ref={inputRef} />
      </div>
    </>
  );
}
