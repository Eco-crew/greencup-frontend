import { useEffect, useRef, useState } from "react";

import "./PercentBar.css";

//수거현황 퍼센트바
//ReuseOperatorRequestPage에서 fetch로 받은 결과이다
export default function PercentBar({ totalRequest, completedRequest }) {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null);
  //초록 프로그래스바의 width
  const [progressWidth, setProgressWidth] = useState(0);
  //퍼센트 텍스트 값
  const [percent, setPercent] = useState(0);
  //퍼센트 텍스트의 위치
  const [textPosition, setTextPosition] = useState(0);

  useEffect(() => {
    const total = Number(totalRequest) || 0;
    const completed = Number(completedRequest) || 0;

    // total이 0이면 0%로 처리
    const currentPercent =
      total > 0 ? Math.floor((completed / total) * 100) : 0;
    setPercent(currentPercent);

    //getBoundingClientRect => dom의 실제 정보 => 미디어 쿼리시에도 적용되게끔
    const updateWidth = () => {
      if (containerRef.current) {
        let parentWidth = containerRef.current.getBoundingClientRect().width;
        //console.log(parentWidth);

        let tmpProgressWidth = Math.floor((parentWidth / 100) * currentPercent);
        //console.log(tmpProgressWidth);
        setProgressWidth(tmpProgressWidth == 0 ? 100 : tmpProgressWidth);

        if (textRef.current) {
          let textWidth = textRef.current.getBoundingClientRect().width;

          if (currentPercent <= 0) {
            //0%여도 글자는 나오게!!
            setTextPosition(20);
            progressBarRef.current.style.backgroundColor = "lightgray";
          } else {
            //20은 여유분
            setTextPosition(tmpProgressWidth - textWidth - 20);
            progressBarRef.current.style.backgroundColor = "green";
          }
        }
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    //depth 값 변경시
    //이전 effect의 return 먼저 실행 (cleanup)
    //그 다음 새 effect 본문 실행
    return () => window.removeEventListener("resize", updateWidth);
  }, [totalRequest, completedRequest]);

  const progressBarStyle = (progressWidth) => ({
    //px 단위임
    width: progressWidth,
  });

  const progressTextStyle = (textPosition) => ({
    //px 단위임
    left: textPosition,
  });

  return (
    <>
      <div className="progress" id="progress_container" ref={containerRef}>
        <div
          className="progress"
          id="progress_bar"
          ref={progressBarRef}
          style={progressBarStyle(progressWidth)}
        >
          <div
            className="progress_text"
            ref={textRef}
            style={progressTextStyle(textPosition)}
          >
            {percent}%
          </div>
        </div>
      </div>
    </>
  );
}
