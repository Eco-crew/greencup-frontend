import "./ConfirmButton.css";

//업체지점장- 확인 공통 버튼
//외부에서 width, height 지정
//이 버튼을 클릭시 실행할 함수도 외부에서 지정하여 onClick 변수명으로 넘겨줌
export default function ConfirmButton({width, height, onClick}) {
  const confirmButtonStyle = () => ({
    width: width,
    height: height,
  });

  return (
    <>
      <div className="partnerConfirmButton" style={confirmButtonStyle()} onClick={onClick}>
        <div className="partnerConfirmButtonText">확인</div>
      </div>
    </>
  );
}
