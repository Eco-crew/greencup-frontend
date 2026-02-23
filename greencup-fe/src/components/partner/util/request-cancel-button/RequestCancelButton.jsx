import './IsCompleteButton.css';

//업체지점장- 대여기록- 요청중 취소버튼 구현시에 쓸 버튼
//props로 텍스트 및 버튼 색깔 
//props로 width, height도 받아옴
//props로 버튼 클릭시 동작할 함수도 받아옴
export default function RequestCancelButton({width, height, text, backgroundColor, dataId, onClick}){
    const RequestCancelButtonStyle = () => ({
        //숫자만 넣어도 px 인식
        width:width,
        height:height,
        backgroundColor:backgroundColor,
    });
    return(
        <>
        <div className="requestCancelButton" style={RequestCancelButtonStyle()} data-id={dataId} onClick={onClick}>
            <div className="requestCancelText">{text}</div>
        </div>
        </>
    );
}