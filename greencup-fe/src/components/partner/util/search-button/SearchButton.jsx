import './SearchButton.css';

//업체지점장- 조회 공통 버튼
//외부에서 width, height 지정
//이 버튼을 클릭시 실행할 함수도 외부에서 지정하여 onClick 변수명으로 넘겨줌
export default function SearchButton({width, height, onClick}){
    const searchButtonStyle = () => ({
        //숫자만 넣어도 px 인식
        width:width,
        height:height,
    });

    return(
        <>
        <div id="searchButton" style={searchButtonStyle()} onClick={onClick}>
            <div className="searchText">조회</div>
        </div>
        </>
    );
}