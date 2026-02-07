import './ReuseOperatorPartnerManageDetailPage.css';

import HolidayCalendar from '../../../components/reuse-operator/partner-manage/detail/holiday/HolidayCalendar';

export default function ReuseOperatorPartnerManageDetailPage(){
    return(
        <>
         <div className="reuse_partner_manage_detail_container">
            <HolidayCalendar/>
         </div>
        </>
    );
}