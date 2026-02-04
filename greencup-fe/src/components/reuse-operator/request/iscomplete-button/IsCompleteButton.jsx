import './IsCompleteButton.css';

//수거지점장- 요청현황- 완료와 취소버튼 구현시에 쓸 버튼
//props로 완료/취소 텍스트 및 버튼 색깔 
//props로 width, height도 받아옴
//props로 버튼 클릭시 동작할 함수도 받아옴
export default function IsCompleteButton({width, height, text, backgroundColor, dataId, onClick}){
    const isCompleteButtonStyle = () => ({
        //숫자만 넣어도 px 인식
        width:width,
        height:height,
        backgroundColor:backgroundColor,
    });
    return(
        <>
        <div id="isCompleteButton" style={isCompleteButtonStyle()} data-id={dataId} onClick={onClick}>
            <div className="isCompleteText">{text}</div>
        </div>
        </>
    );
}