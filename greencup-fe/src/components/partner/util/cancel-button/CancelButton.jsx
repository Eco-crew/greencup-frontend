import "./CancelButton.css";

//업체지점장- 취소 공통 버튼
//외부에서 width, height 지정
//이 버튼을 클릭시 실행할 함수도 외부에서 지정하여 onClick 변수명으로 넘겨줌
export default function CancelButton({width, height, onClick}) {
  const cancelButtonStyle = () => ({
    width: width,
    height: height,
  });

  return (
    <>
      <div className="partnerCancelButton" style={cancelButtonStyle()} onClick={onClick}>
        <div className="partnerCancelButtonText">취소</div>
      </div>
    </>
  );
}
