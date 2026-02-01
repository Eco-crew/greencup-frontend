import { useEffect, useLayoutEffect, useRef, useState } from "react";

import "./PercentBar.css";

//수거현황 퍼센트바
//ReuseOperatorRequestPage에서 fetch로 받은 결과이다
export default function PercentBar({ totalRequest, completedRequest }) {
  //로그인한 수거지점장에게 온 전체 요청갯수
  //const [totalRequest,setTotalRequest] = useState(0);
  //로그인한 수거지점장이 완료한 요청갯수
  //const [completedRequest,setCompletedRequest] = useState(0);

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
    console.log(currentPercent);
    setPercent(currentPercent);

    //getBoundingClientRect => dom의 실제 정보
    const updateWidth = () => {
      if (containerRef.current) {
        let parentWidth = containerRef.current.getBoundingClientRect().width;
        console.log(parentWidth);
        console.log(Math.floor((parentWidth/100) * currentPercent));
        
        setProgressWidth(Math.floor((parentWidth/100) * currentPercent));
      }
    };

    updateWidth(); 
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);

    //depth 값 변경시
    //이전 effect의 return 먼저 실행 (cleanup)
    //그 다음 새 effect 본문 실행
  }, [totalRequest, completedRequest]);

  const progressBarStyle = (progressWidth) => ({
    //px 단위임
    width:progressWidth,
  })

  return (
    <>
      <div className="progress" id="progress_container" ref={containerRef}>
        <div className="progress" id="progress_bar" style={progressBarStyle(progressWidth)}>
          <div className="progress_text" ref={textRef}>{percent}%</div>
        </div>
      </div>
    </>
  );
}
