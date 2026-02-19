import './IsCompleteButton.css';

// 수거지점장 - 요청현황 - 완료 / 취소 버튼
// width, height, text, backgroundColor, dataId, onClick 외부에서 전달받음
export default function IsCompleteButton({
  width,
  height,
  text,
  backgroundColor,
  dataId,
  onClick
}) {

  const isCompleteButtonStyle = {
    width: width,
    height: height,
    backgroundColor: backgroundColor,
  };

  return (
    <div
      className="isCompleteButton"   // ✅ id → class로 변경 (중요)
      style={isCompleteButtonStyle}
      data-id={dataId}
      onClick={onClick}
    >
      <span className="isCompleteText">{text}</span>
    </div>
  );
}
