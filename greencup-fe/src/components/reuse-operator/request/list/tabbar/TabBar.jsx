import './TabBar.css';
import { TOTAL, COMPLETED, NOTCOMPLETED, NOTCANCELLED } from '../../../../../util/constant';

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
        <div className="tab_container" onClick={(e) => {tabBarClicked(e)}}>
            {/* 뭐 눌렀는지에 따라 배경 스타일을 바꾼다 */}
            <div className="tab_element" id="tab_total" style={tabBarStyle(tabBarContent === TOTAL)}>전체</div>
            <div className="tab_element" id="tab_completed" style={tabBarStyle(tabBarContent === COMPLETED)}>완료</div>
            <div className="tab_element" id="tab_notcompleted" style={tabBarStyle(tabBarContent === NOTCOMPLETED)}>미완료</div>
            <div className="tab_element" id="tab_cancelled" style={tabBarStyle(tabBarContent === NOTCANCELLED)}>취소</div>
        </div>
        </>
    );
}