import './TabBar.css';
import { TOTAL, REQUESTING, COMPLETED, CANCELLED } from '../../../../util/constant';

//수거지점장- 요청현황- 전체, 완료, 미완료 탭
//tabBarClicked => 탭바를 클릭시 실행되는 함수
export default function TabBar({tabBarContent, tabBarClicked}){
    const tabBarStyle = (isActive) => ({
    background: isActive ? "#5FAC4F" : "#f5f5f5",
    color: isActive ? "#ffffff" : "#333333",
    borderColor: isActive ? "#5FAC4F" : "#cfcfcf"
    })

    return(
        <>
        <div className="partner_request_tab_container" onClick={(e) => {tabBarClicked(e)}}>
            {/* 뭐 눌렀는지에 따라 배경 스타일을 바꾼다 */}
            <div className="partner_request_tab_element" id="partner_request_tab_total" style={tabBarStyle(tabBarContent === TOTAL)}>전체</div>
            <div className="partner_request_tab_element" id="partner_request_tab_requesting" style={tabBarStyle(tabBarContent === REQUESTING)}>요청중</div>
            <div className="partner_request_tab_element" id="partner_request_tab_completed" style={tabBarStyle(tabBarContent === COMPLETED)}>완료</div>
            <div className="partner_request_tab_element" id="partner_request_tab_cancelled" style={tabBarStyle(tabBarContent === CANCELLED)}>취소</div>
        </div>
        </>
    );
}