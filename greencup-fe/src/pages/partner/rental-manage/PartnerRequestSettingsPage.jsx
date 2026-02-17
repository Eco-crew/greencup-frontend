import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./PartnerRequestSettingsPage.css";

import PartnerInfo from "../../../components/partner/rental-manage/PartnerInfo";
import ReuseOperatorManagerInfo from "../../../components/partner/rental-manage/ReuseOperatorManagerInfo";
import PartnerGreenCupInfo from "../../../components/partner/rental-manage/PartnerGreenCupInfo";
import PartnerSetting from "../../../components/partner/rental-manage/PartnerSetting";
import PartnerMessage from "../../../components/partner/rental-manage/PartnerMessage";
import HolidayCalendar from "../../../components/partner/rental-manage/holiday/HolidayCalendar";
import HolidayList from "../../../components/partner/rental-manage/holiday/HolidayList";
import HolidayRegularList from "../../../components/partner/rental-manage/holiday/HolidayRegularList";
import GoUpdateFormButton from "../../../components/partner/util/GoUpdateFormButton";

import { fetchPartnerRental } from "../../../api/dummyPartnerRental";

//업체지점장-대여관리-대여정보
export default function PartnerRequestSettingsPage() {
  //로그인한 업체지점장 본인의 아이디는 백엔드 세션에서 얻는다

  //partnerId 조회한 담당 수거지점장의 데이터
  const [reuse, setReuse] = useState({});
  //partnerId 조회한 담당 업체지점장의 데이터
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
  const handleFetchReuseDetailPartner = async () => {
    fetchPartnerRental().then((data) => {
      setPartner(data.partner);
      setReuse(data.reuse);
      setSettingInfo(data.settingInfo);
      setWeeklyOffDays(data.weeklyOffDays);
      setOffDates(data.offDates);
      setLoading(false);
    });
  };

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 요청 내용 정보 설정
    handleFetchReuseDetailPartner();
  }, []);

  //목록으로 버튼 클릭시 실행해야하는것
  const goUpdateFormClick = () => {
    //navigate("/reuse-operator/partner-manage");
  };

  //여기는 렌더링 하는 영역
  if (loading)
    return (
      <div className="partner_rental_manage_container">
        <div>로딩중</div>
      </div>
    );
  return (
    <>
      <div className="partner_rental_manage_container">
        <div className="partner_rental_manage_partner_container">
          <div className="partner_rental_manage_partner_info_container">
            <PartnerInfo
              partnerName={partner.partnerName}
              partnerManagerName={partner.partnerManagerName}
            />
          </div>
          <div className="partner_rental_manage_goupdateform_container">
            <GoUpdateFormButton
              width={"100%"}
              height={50}
              onClick={goUpdateFormClick}
            />
          </div>
        </div>
        <div className="partner_rental_reuse_manager_partner_greencup_container">
          <div className="partner_rental_reuse_manager_container">
            <ReuseOperatorManagerInfo
              reuseOperatorName={reuse.reuseOperatorName}
              reuseOperatorManagerName={reuse.reuseOperatorManagerName}
              reuseOperatorManagerPhone={reuse.reuseOperatorManagerPhone}
            />
          </div>
          <div className="partner_rental_partner_greencup_container">
            <PartnerGreenCupInfo
              totalLoanCount={partner.totalLoanCount}
              totalReturnCount={partner.totalReturnCount}
              totalBrokenLostCount={partner.totalBrokenLostCount}
            />
          </div>
        </div>

        <div className="partner_rental_partner_setting_memo_container">
          <div className="partner_rental_manage_partner_setting_total_container">
            <div className="partner_rental_manage_holiday_title">기본 설정</div>
            <PartnerSetting
              defaultNeedCount={settingInfo.defaultNeedCount}
              defaultReturnCount={settingInfo.defaultReturnCount}
              defaultVisitTime={settingInfo.defaultVisitTime}
            />
          </div>
          <div className="partner_rental_manage_partner_message_total_container">
            <div className="partner_rental_manage_holiday_title">
              비고 메세지
            </div>
            <PartnerMessage memo={settingInfo.memo} />
          </div>
        </div>
        <div className="partner_rental_manage_holiday_container">
          <div className="partner_rental_manage_holiday_calendar_total_container">
            <div className="partner_rental_manage_holiday_title">
              비정기 휴무 캘린더
            </div>
            <HolidayCalendar offDates={offDates} />
          </div>
          <div className="partner_rental_manage_holiday_list_total_container">
            <div className="partner_rental_manage_holiday_title">
              비정기 휴무일
            </div>
            <HolidayList offDates={offDates} />
          </div>
          <div className="partner_rental_manage_regular_holiday_list_total_container">
            <div className="partner_rental_manage_holiday_title">
              정기 휴무일
            </div>
            <HolidayRegularList weeklyOffDays={weeklyOffDays} />
          </div>
        </div>
      </div>
    </>
  );
}
