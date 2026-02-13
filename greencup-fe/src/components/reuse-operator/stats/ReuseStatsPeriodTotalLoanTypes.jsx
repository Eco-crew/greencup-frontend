import { useRef, useState, useEffect } from "react";

import "./ReuseStatsPeriodTotalLoanTypes.css";

import {
  PERIOD_TOTAL_LOAN_TYPE_NAME,
  PERIOD_TOTAL_LOAN_TYPE_NAME_OFFICE,
  PERIOD_TOTAL_LOAN_TYPE_NAME_PUBLIC,
  PERIOD_TOTAL_LOAN_TYPE_NAME_EVENT,
  PERIOD_TOTAL_LOAN_TYPE_NAME_CAFE,
} from "../../../util/constant";

export default function ReuseStatsPeriodTotalLoanTypes({
  periodTotalLoanTypes,
}) {
  //chartjs 객체를 저장
  //인스턴스를 useRef로 쓰는이유 => 값을 변경해도 리렌더를 안하고, 즉시 접근가능
  const chartObjRef = useRef(null);

  //chart를 연결할 dom
  const chartDom = useRef(null);

  //업종 타입 키를 저장
  const [periodTotalLoanTypeNameList, setPeriodTotalLoanTypeName] = useState(
    [],
  );

  //업종 타입 값 대여수를 저장
  const [periodTotalLoanTypePercent, setPeriodTotalLoanTypePercent] = useState(
    [],
  );

  //mount할때 객체 생성
  useEffect(() => {
    chartObjRef.current = new Chart(chartDom.current, {
      type: "doughnut", // pie, doughnut, line ...
      data: {
        labels: ["사무실", "공공기관", "행사장", "카페"],
        datasets: [
          {
            label: "업종별 대여 통계",
            data: [0, 0, 0, 0],
            backgroundColor: [
              "rgba(46,125,50,0.65)", // 메인 녹색
              "rgba(33,150,243,0.65)", // 블루
              "rgba(255,167,38,0.65)", // 앰버
              "rgba(0,150,136,0.65)", // 틸
            ],
            borderColor: ["#2e7d32", "#2196f3", "#ffa726", "#009688"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, //부모크기에 따라 반응형
        maintainAspectRatio: false, //부모 div 높이에 꽉 채우기
        cutout: "60%", // 도넛 두께
        plugins: {
          legend: {
            position: "top", //범례를 위에
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed.toLocaleString()}%`,
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

    let putValueData = [];
    let putLabelData = [];

    console.log(periodTotalLoanTypes);

    periodTotalLoanTypes.forEach((periodTotalLoanType) => {
      for (const [key, value] of Object.entries(periodTotalLoanType)) {
        //만약 키가 periodTotalLoanTypeName면
        if (key === PERIOD_TOTAL_LOAN_TYPE_NAME) {
          switch (value) {
            case PERIOD_TOTAL_LOAN_TYPE_NAME_OFFICE:
              putLabelData.push("사무실");
              break;
            case PERIOD_TOTAL_LOAN_TYPE_NAME_PUBLIC:
              putLabelData.push("공공기관");
              break;
            case PERIOD_TOTAL_LOAN_TYPE_NAME_EVENT:
              putLabelData.push("행사장");
              break;
            case PERIOD_TOTAL_LOAN_TYPE_NAME_CAFE:
              putLabelData.push("카페");
              break;
            default:
              break;
          }
        } else {
          putValueData.push(value);
        }
      }
    });

    console.log(putValueData);
    console.log(putLabelData);

    chart.data.datasets[0].data = putValueData;
    chart.data.datasets[0].labels = putLabelData;
    chart.update();

    console.log(chart.data.datasets[0]);
  }, [periodTotalLoanTypes]);

  return (
    <>
      <canvas ref={chartDom}></canvas>
    </>
  );
}
