import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ReuseOperatorPartnerManageDetailPage.css";

import HolidayCalendar from "../../../components/reuse-operator/partner-manage/detail/holiday/HolidayCalendar";
import HolidayList from "../../../components/reuse-operator/partner-manage/detail/holiday/HolidayList";
import PartnerInfo from "../../../components/reuse-operator/partner-manage/detail/PartnerInfo";
import PartnerManagerInfo from "../../../components/reuse-operator/partner-manage/detail/PartnerManagerInfo";
import PartnerMap from "../../../components/reuse-operator/partner-manage/detail/PartnerMap";
import PartnerGreenCupInfo from "../../../components/reuse-operator/partner-manage/detail/PartnerGreenCupInfo";
import PartnerSetting from "../../../components/reuse-operator/partner-manage/detail/PartnerSetting";
import PartnerMessage from "../../../components/reuse-operator/partner-manage/detail/PartnerMessage";
import HolidayRegularList from "../../../components/reuse-operator/partner-manage/detail/holiday/HolidayRegularList";

import { fetchDetailReusePartner } from "../../../api/dummyReusePartners";

export default function ReuseOperatorPartnerManageDetailPage() {
  //url로 받은 partnerId
  const { partnerId } = useParams();
  //console.log(partnerId);

  //partnerId 조회한 해당 partner의 partner 항목
  const [partner, setPartner] = useState({});
  //partnerId 조회한 해당 partner의 settingInfo 항목
  const [settingInfo, setSettingInfo] = useState({});
  //partnerId 조회한 해당 partner의 weeklyOffDays 항목
  const [weeklyOffDays, setWeeklyOffDays] = useState([]);
  //partnerId 조회한 해당 partner의 offDates 항목
  const [offDates, setOffDates] = useState([]);
  //fetch로 불러올동안 로딩중 여부
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //해당 항목 불러온후 상태관리하는 함수
  const handleFetchReuseDetailPartner = (partnerId) => {
    fetchDetailReusePartner(partnerId).then((data) => {
      //한개이므로
      setPartner(data.partners[0].partner);
      setSettingInfo(data.partners[0].settingInfo);
      setWeeklyOffDays(data.partners[0].weeklyOffDays);
      setOffDates(data.partners[0].offDates);

      setLoading(false);
    });
  };

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 요청 내용 정보 설정
    handleFetchReuseDetailPartner(partnerId);
  }, []);

  //목록으로 버튼 클릭시 실행해야하는것
  const goListClick = () => {
    navigate("/reuse-operator/partner-manage");
  };

  return (
    <>
      <div className="reuse_partner_manage_detail_container">
        <div className="reuse_partner_manage_detail_partner_container">
          <div className="reuse_partner_manage_detail_partner_info_container">
            <PartnerInfo partnerName={partner.partnerName} />
            <PartnerManagerInfo
              partnerManagerName={partner.partnerManagerName}
              partnerManagerPhone={partner.partnerManagerPhone}
              partnerOperatingStart={partner.partnerOperatingStart}
              partnerOperaingEnd={partner.partnerOperaingEnd}
            />
          </div>
          <PartnerMap partnerAddress={partner.partnerAddress} />
        </div>
        <PartnerGreenCupInfo
          currentLoanCount={partner.currentLoanCount}
          totalLoanCount={partner.totalLoanCount}
          totalReturnCount={partner.totalReturnCount}
          totalBrokenLostCount={partner.totalBrokenLostCount}
          contractDate={partner.contractDate}
        />
        <div className="reuse_partner_manage_detail_partner_setting_memo_container">
          <div className="reuse_partner_manage_detail_partner_setting_total_container">
            <div>기본 설정</div>
            <PartnerSetting
              defaultNeedCount={settingInfo.defaultNeedCount}
              defaultReturnCount={settingInfo.defaultReturnCount}
              defaultVisitTime={settingInfo.defaultVisitTime}
            />
          </div>
          <div className="reuse_partner_manage_detail_partner_message_total_container">
            <div>비고 메세지</div>
            <PartnerMessage memo={partner.memo} />
          </div>
        </div>
        <div className="reuse_partner_manage_holiday_container">
          <div className="reuse_partner_manage_holiday_calendar_total_container">
            <div>비정기 휴무 캘린더</div>
            <HolidayCalendar offDates={offDates} />
          </div>
          <div className="reuse_partner_manage_holiday_list_total_container">
            <div>비정기 휴무일</div>
            <HolidayList offDates={offDates} />
          </div>

          <div className="reuse_partner_manage_regular_holiday_list_total_container">
            <div>정기 휴무일</div>
            <HolidayRegularList weeklyOffDays={weeklyOffDays}/>
          </div>
        </div>
      </div>
    </>
  );
}
