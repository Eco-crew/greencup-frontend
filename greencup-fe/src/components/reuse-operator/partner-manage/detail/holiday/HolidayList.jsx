import './HolidayList.css';

import Pagination from '../../../../pagination/Pagination';
//수거지점장- 업체관리-상세페이지-휴무일 리스트
export default function HolidayList(){
    return(
        <>
        <div className="reuse-partner-manage-holiday-list-container">
            <div className="reuse-partner-manage-holiday-title">휴무일</div>
            <div className="reuse-partner-manage-holiday-list">
                <div className="reuse-partner-manage-holiday-element">2026-02-06</div>
                <div className="reuse-partner-manage-holiday-element">2026-02-10</div>
                <div className="reuse-partner-manage-holiday-element">2026-02-14</div>
                <div className="reuse-partner-manage-holiday-element">2026-02-14</div>
                <div className="reuse-partner-manage-holiday-element">2026-02-14</div>
                <div className="reuse-partner-manage-holiday-element">2026-02-14</div>
                <div className="reuse-partner-manage-holiday-element">2026-02-14</div>
            </div>
        </div>
        </>
    );
}