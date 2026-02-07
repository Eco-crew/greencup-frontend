import "./ReuseOperatorPartnerManageDetailPage.css";

import HolidayCalendar from "../../../components/reuse-operator/partner-manage/detail/holiday/HolidayCalendar";
import HolidayList from "../../../components/reuse-operator/partner-manage/detail/holiday/HolidayList";

export default function ReuseOperatorPartnerManageDetailPage() {
  return (
    <>
      <div className="reuse_partner_manage_detail_container">
        <div className="reuse_partner_manage_holiday-container">
          <HolidayCalendar />
          <HolidayList />
        </div>
      </div>
    </>
  );
}
