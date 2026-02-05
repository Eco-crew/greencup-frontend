import "./GoListButton.css";

//수거지점장- 목록으로 공통 버튼
//외부에서 width, height 지정
//이 버튼을 클릭시 실행할 함수도 외부에서 지정하여 onClick 변수명으로 넘겨줌
export default function GoListButton({width, height, onClick}) {
  const goListButtonStyle = () => ({
    width: width,
    height: height,
  });

  return (
    <>
      <div className="goListButton" style={goListButtonStyle()} onClick={onClick}>
        <div className="goListText">목록으로</div>
      </div>
    </>
  );
}
