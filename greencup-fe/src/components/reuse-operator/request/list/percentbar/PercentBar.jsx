import { useEffect, useRef, useState } from "react";

import "./PercentBar.css";

//수거현황 퍼센트바
//ReuseOperatorRequestPage에서 fetch로 받은 결과이다
export default function PercentBar({ totalRequest, completedRequest }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  //초록 프로그래스바의 width
  const [progressWidth, setProgressWidth] = useState(0);
  //퍼센트 텍스트 값
  const [percent, setPercent] = useState(0);
  //퍼센트 텍스트의 위치
  const [textPosition, setTextPosition] = useState(0);

  useEffect(() => {
    //현재는 임의로 갯수들이 온다 가정하고 계산하여 넣어본다
    let currentPercent = Math.floor((completedRequest / totalRequest) * 100);
    //console.log(currentPercent);
    setPercent(currentPercent);

    //getBoundingClientRect => dom의 실제 정보 => 미디어 쿼리시에도 적용되게끔
    const updateWidth = () => {
      if (containerRef.current) {
        let parentWidth = containerRef.current.getBoundingClientRect().width;
        //console.log(parentWidth);

        let tmpProgressWidth = Math.floor((parentWidth / 100) * currentPercent);
        //console.log(tmpProgressWidth);
        setProgressWidth(tmpProgressWidth);

        if (textRef.current){
            let textWidth = textRef.current.getBoundingClientRect().width;

            let safePosition = tmpProgressWidth - textWidth - 10;

            // 너무 왼쪽으로 붙지 않게 최소값 설정
            if (safePosition < 5) safePosition = 5;

            setTextPosition(safePosition);
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
    <div className="percent_bar_container" ref={containerRef}>
      <div
        className="percent_bar_fill"
        style={progressBarStyle(progressWidth)}
      >
        <div
          className="percent_bar_text"
          ref={textRef}
          style={progressTextStyle(textPosition)}
        >
          {percent}%
        </div>
      </div>
    </div>
  );
}
