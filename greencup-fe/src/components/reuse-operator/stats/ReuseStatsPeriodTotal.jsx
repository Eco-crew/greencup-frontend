import { useRef, useState, useEffect } from "react";

import "./ReuseStatsPeriodTotal.css";

export default function ReuseStatsPeriodTotal({
  periodTotalLoanCount,
  periodTotalReturnCount,
  periodTotalBrokenLostCount,
}) {
  //chartjs 객체를 저장
  //인스턴스를 useRef로 쓰는이유 => 값을 변경해도 리렌더를 안하고, 즉시 접근가능
  const chartObjRef = useRef(null);

  //chart를 연결할 dom
  const chartDom = useRef(null);

  //chartjs에 담길 데이터
  //   const [periodTotalLoanCount, setPeriodTotalLoanCount] = useState(0);
  //   const [periodTotalReturnCount, setPeriodTotalReturnCount] = useState(0);
  //   const [periodTotalBrokenLostCount, setPeriodTotalBrokenLostCount] =
  //     useState(0);

  //mount할때 객체 생성
  useEffect(() => {
    chartObjRef.current = new Chart(chartDom.current, {
      type: "bar", // pie, doughnut, line ...
      data: {
        labels: ["대여수", "반납수", "파손 및 분실 개수"],
        datasets: [
          {
            label: "전체 수거 통계",
            data: [0, 0, 0],
            backgroundColor: [
              "rgba(46,125,50,0.45)",
              "rgba(67,160,71,0.45)",
              "rgba(129,199,132,0.45)",
            ],
            borderColor: ["#2e7d32", "#43a047", "#81c784"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, //부모크기에 따라 반응형
        maintainAspectRatio: false, //부모 div 높이에 꽉 채우기
        plugins: {
          legend: {
            position: "top", //범례를 위에
          },
        },
        scales: {
          y: {
            beginAtZero: true, //0부터 시작
            ticks: {
              stepSize: 100, //눈금 한개당 단위
            },
          },
        },
      },
    });

    return () => {
      chartObjRef.current?.destroy();
      chartObjRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartObjRef.current;
    if (!chart) return;

    chart.data.datasets[0].data = [
      periodTotalLoanCount,
      periodTotalReturnCount,
      periodTotalBrokenLostCount,
    ];
    chart.update();
  }, [
    periodTotalLoanCount,
    periodTotalReturnCount,
    periodTotalBrokenLostCount,
  ]);

  return (
    <>
      <canvas ref={chartDom}></canvas>
    </>
  );
}
