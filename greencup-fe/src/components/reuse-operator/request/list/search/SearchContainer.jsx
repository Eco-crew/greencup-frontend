import './SearchContainer.css';

//수거지점장- 요청현황- 조회기간과 제휴 지점명 조회 검색박스
export default function SearchContainer({startDateChange,endDateChange,partnerNameChange}){
    return(
        <>
        <div className="search_container">
            <div className="search_sub_container">
                <div className="search_element">조회 기간</div>
                <div className="search_element">제휴 지점명</div>
            </div>
            <div className="search_sub_container">
                <div className="search_element">
                    <input id="start_date" type="date" onChange={(e) => {startDateChange(e.target.value)}}/>
                    <span>~</span>
                    <input id="end_date" type="date" onChange={(e)=> {endDateChange(e.target.value)}}/>
                </div>
                <div className="search_element">
                    <input id="partner_name" type="text" onChange={(e)=>{partnerNameChange(e.target.value)}}/>
                </div>
            </div>
        </div>
        </>
    );
}