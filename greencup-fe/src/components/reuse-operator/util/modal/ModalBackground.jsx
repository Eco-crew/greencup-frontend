import { useState, useEffect } from "react";
import "./ModalBackground.css";

//모달안에 들어갈 내용은 children => 태그 가능
//하얀 모달 크기 외부에서 지정 => width, height
export default function ModalBackground({ children, width, height }) {
  //모달을 전체 스크롤 너비로 하면 하얀창 너비도 전체스크롤 너비에 따라서 되므로 골치 아파진다.
  //   const [darkHeight, setDarkHeight] = useState(0);
  //   const [darkWidth, setDarkWidth] = useState(0);

  //   useEffect(() => {
  //     const measure = () => {
  //       const width = Math.max(
  //         document.documentElement.scrollWidth,
  //         document.body.scrollWidth,
  //       );
  //       const height = Math.max(
  //         document.documentElement.scrollHeight,
  //         document.body.scrollHeight,
  //       );
  //       setDarkWidth(width);
  //       setDarkHeight(height);
  //     };

  //     measure();
  //     window.addEventListener("resize", measure);
  //     return () => window.removeEventListener("resize", measure);
  //   }, []);

  const modalWhiteBackgroundStyle = () => ({
    width:width, height:height
  });

  useEffect(() => {
    //index.css 참조
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  return (
    <>
      <div className="modalDarkBackground">
        <div
          className="modalWhiteBackground"
          style={modalWhiteBackgroundStyle}
        >
          {children}
        </div>
      </div>
    </>
  );
}
