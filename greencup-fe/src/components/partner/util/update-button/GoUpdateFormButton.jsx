import "./GoUpdateFormButton.css";

//업체지점장- 대여정보 수정 버튼
//외부에서 width, height,text 지정
//이 버튼을 클릭시 실행할 함수도 외부에서 지정하여 onClick 변수명으로 넘겨줌
export default function GoUpdateFormButton({width, height, text, onClick}) {
  const goUpdateFormButtonStyle = () => ({
    width: width,
    height: height,
  });

  return (
    <>
      <div className="goUpdateFormButton" style={goUpdateFormButtonStyle()} onClick={onClick}>
        <div className="goUpdateFormText">{text}</div>
      </div>
    </>
  );
}
