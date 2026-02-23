import { useState, useEffect } from "react";
import "./ModalBackground.css";

//모달안에 들어갈 내용은 children => 태그 가능
//업체지점장의 취소 모달
export default function ModalBackground({ children }) {

  useEffect(() => {
    //index.css 참조
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  return (
    <>
      <div className="partnerModalDarkBackground">{children}</div>
    </>
  );
}
