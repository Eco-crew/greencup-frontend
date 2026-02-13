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
              "rgba(46,125,50,0.6)", // 대여수
              "rgba(33,150,243,0.6)", // 반납수
              "rgba(255,167,38,0.6)", // 파손/분실
            ],
            borderColor: ["#2e7d32", "#2196f3", "#ffa726"],
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
            labels: {
              //dataset label만 숨기기
              filter: (legendItem) => legendItem.text !== "전체 수거 통계",
            },
          },

          title: {
            display: true,
            text: "전체 수거 통계",
            align: "start", // 왼쪽 정렬
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true, //0부터 시작
            ticks: {
              stepSize: 100, //눈금 한개당 단위
              callback: function (value) {
                return value + "개";
              },
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
