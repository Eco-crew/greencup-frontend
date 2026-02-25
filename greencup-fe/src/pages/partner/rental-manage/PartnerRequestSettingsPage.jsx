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
import GoUpdateFormButton from "../../../components/partner/util/update-button/GoUpdateFormButton";

import PartnerSettingUpdateForm from "../../../components/partner/rental-manage-update-form/PartnerSettingUpdateForm";
import PartnerMessageUpdateForm from "../../../components/partner/rental-manage-update-form/PartnerMessageUpdateForm";
import HolidayCalendarUpdateForm from "../../../components/partner/rental-manage-update-form/HolidayCalendarUpdateForm";
import HolidayListUpdateForm from "../../../components/partner/rental-manage-update-form/HolidayListUpdateForm";
import HolidayRegularListUpdateForm from "../../../components/partner/rental-manage-update-form/HolidayRegularListUpdateForm";

import { fetchPartnerRental } from "../../../api/dummyPartnerRental";
import { isValidTime } from "../../../util/utilFunction";

//업체지점장-대여관리-대여정보
export default function PartnerRequestSettingsPage() {
  //로그인한 업체지점장 본인의 아이디는 백엔드 세션에서 얻는다

  //partnerId 조회한 담당 수거지점장의 데이터
  const [reuse, setReuse] = useState({});
  //partnerId 조회한 담당 업체지점장의 데이터
  const [partner, setPartner] = useState({});
  //partnerId 조회한 해당 partner의 settingInfo  기본설정 항목
  const [settingInfo, setSettingInfo] = useState({});
  //기본설정 시간 입력값 형식이 HH:MM이 아니라면
  const [settingTimeError, setSettingTimeError] = useState(false);
  //기본설정 수정 버튼을 눌러서 수정모드인지 여부
  const [isSettingInfoUpdatingMode, setIsSettingInfoUpdatingMode] =
    useState(false);
  //비고 메시지 수정 버튼을 눌러서 수정모드인지 여부 => 값은 settingInfo.memo에 존재
  const [isMemoUpdatingMode, setIsMemoUpdatingMode] = useState(false);
  //partnerId 조회한 해당 partner의 offDates 비정기 휴무일 항목
  const [offDates, setOffDates] = useState([]);
  //수정폼에서의 선택한 비정기휴일 모든 날짜들
  const [updateOffDates, setUpdateOffDates] = useState([]);
  //비교를 해서 추가할 비정기휴일
  const [insertOffDates, setInsertOffDates] = useState([]);
  //비교를 해서 삭제할 비정기휴일
  const [deleteOffDates, setDeleteOffDates] = useState([]);
  //비정기 휴무 수정 버튼을 눌러서 수정모드인지 여부
  const [isIrregularUpdatingMode, setIsIrregularUpdatingMode] = useState(false);
  //partnerId 조회한 해당 partner의 weeklyOffDays 정기 휴무일 요일 항목
  const [weeklyOffDays, setWeeklyOffDays] = useState([]);
  //수정폼에서의 선택한 정기 휴무 요일
  const [updateOffWeeklyOffDays, setUpdateOffWeeklyOffDays] = useState([]);
  //정기 휴무일 수정 버튼을 눌러서 수정모드인지 여부
  const [isRegularUpdatingMode, setIsRegularUpdatingMode] = useState(false);
  //fetch로 불러올동안 로딩중 여부
  const [loading, setLoading] = useState(true);
  //대여수정 버튼을 눌러서 수정모드인지 여부
  //const [isUpdatingMode, setIsUpdatingMode] = useState(false);

  //해당 항목 불러온후 상태관리하는 함수
  const handleFetchRequestSettingPartner = async () => {
    // fetchPartnerRental().then((data) => {
    //   setPartner(data.partner);
    //   setReuse(data.reuse);
    //   setSettingInfo(data.settingInfo);
    //   setWeeklyOffDays(data.weeklyOffDays);
    //   setUpdateOffWeeklyOffDays(data.weeklyOffDays);
    //   setOffDates(data.offDates);
    //   setUpdateOffDates(data.offDates);
    //   setLoading(false);
    // });

    const response = await fetch(`/api/partner/request-settings`, {
      method: "GET",
      credentials: "include", // 세션에 관한 쿠키도 꼭 전송
    });

    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      setPartner(data.partnerInfo);
      setReuse(data.reuseInfo);
      setSettingInfo(data.settingInfo);
      setWeeklyOffDays(data.weeklyOffDays);
      setUpdateOffWeeklyOffDays(data.weeklyOffDays);
      setOffDates(data.offDates);
      setUpdateOffDates(data.offDates);
      setLoading(false);
    } else {
      console.log("업체지점장- 대여현황 불러오기 오류");
    }
  };

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 요청 내용 정보 설정
    handleFetchRequestSettingPartner();
  }, []);

  //대여정보 수정 버튼 클릭시 실행해야하는것
  // const goUpdateFormClick = () => {
  //   setIsUpdatingMode((prev) => !prev);
  // };

  //기본 설정 수정버튼 클릭시 실행해야하는것
  const goUpdateSettingInfoFormClick = () => {
    setIsSettingInfoUpdatingMode((prev) => !prev);

    //만약 수정 완료 상태였다면 fetch
    if (isSettingInfoUpdatingMode) {
      handleFetchUpdateSettingInfo();
    }
  };

  //기본설정 -필요한 갯수와 방문시간 수정 fetch 후 조회 fetch날리기
  const handleFetchUpdateSettingInfo = async () => {
    setLoading(true);
    const response = await fetch(`/api/partner/request-settings/setting-info`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defaultNeedCount: settingInfo.defaultNeedCount,
        defaultVisitTime: `${settingInfo.defaultVisitTime}:00`,
      }),
      credentials: "include", // 세션에 관한 쿠키도 꼭 전송
    });

    if (response.ok) {
      const data = await response.json();
      handleFetchRequestSettingPartner();
    } else {
      console.log("업체지점장- 필요한 갯수와 방문시간 수정 오류");
    }
  };

  //비고 메세지 수정버튼 클릭시 실행해야 하는 것
  const goUpdateMemoFormClick = () => {
    setIsMemoUpdatingMode((prev) => !prev);

    //만약 수정 완료 상태였다면 fetch
    if (isMemoUpdatingMode){
      handleFetchUpdateSettingMemo();
    }
  };

  //비고메시지 수정 fetch 후 조회 fetch날리기
  const handleFetchUpdateSettingMemo = async () => {
    setLoading(true);
    const response = await fetch(`/api/partner/request-settings/memo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memo: settingInfo.memo,
      }),
      credentials: "include", // 세션에 관한 쿠키도 꼭 전송
    });

    if (response.ok) {
      const data = await response.json();
      handleFetchRequestSettingPartner();
    } else {
      console.log("비고 메시지 수정 오류");
    }
  };

  //비정기휴무 수정버튼 클릭시 실행해야 하는 것
  const goUpdateIrregularHolidayFormClick = () => {
    setIsIrregularUpdatingMode((prev) => !prev);

    //만약 수정 완료 상태였다면 fetch
    if (isIrregularUpdatingMode) {
      handleFetchUpdateOffDates();
    }
  };

  //비고메시지 수정 fetch 후 조회 fetch날리기
  const handleFetchUpdateOffDates = async () => {
    setLoading(true);
    const response = await fetch(`/api/partner/request-settings/off-dates`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deletedOffDates: deleteOffDates,
        insertedOffDates:insertOffDates,
      }),
      credentials: "include", // 세션에 관한 쿠키도 꼭 전송
    });

    if (response.ok) {
      const data = await response.json();
      handleFetchRequestSettingPartner();
    } else {
      console.log("비정기 휴무 수정 오류");
    }
  };

  //정기휴무 수정버튼 클릭시 실행해야 하는 것
  const goUpdateRegularHolidayFormClick = () => {
    setIsRegularUpdatingMode((prev) => !prev);
  };

  useEffect(() => {
    //console.log(settingInfo);
  }, [settingInfo]);

  useEffect(() => {
    //console.log(updateOffDates);

    const tmpInsertOffDates = [];
    const tmpDeleteOffDates = [];
    offDates.forEach((offDate) => {
      //업데이트된 배열에 없는거면 삭제할 대상
      if (!updateOffDates.includes(offDate)) {
        tmpDeleteOffDates.push(offDate);
      }
    });

    updateOffDates.forEach((updateOffDate) => {
      //기존 배열에 없는거면 추가할 대상
      if (!offDates.includes(updateOffDate)) {
        tmpInsertOffDates.push(updateOffDate);
      }
    });

    //console.log("tmpInsertOffDates", tmpInsertOffDates);
    //console.log("tmpDeleteOffDates", tmpDeleteOffDates);
    setInsertOffDates(tmpInsertOffDates);
    setDeleteOffDates(tmpDeleteOffDates);
  }, [updateOffDates]);

  useEffect(() => {
    //console.log(updateOffWeeklyOffDays);
  }, [updateOffWeeklyOffDays]);

  //partnersetting 대여정보수정 input박스에 입력시
  const partnerSettingOnChange = (e) => {
    //만약 시간설정이면 HH:MM인지 검사
    if (e.target.name === "defaultVisitTime") {
      const result = isValidTime(e.target.value);
      if (!result) {
        setSettingTimeError(true);
      } else {
        setSettingTimeError(false);
      }
    }
    setSettingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //partnermemo 비고메모 수정 textarea에 입력시
  const partnerMemoOnChange = (e) => {
    setSettingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //holidaycalendar 달력수정폼에서 선택한것들
  const holidayCalendarOnChange = (arr) => {
    setUpdateOffDates(arr);
  };

  //holidaylist에서 x 버튼을 눌러 지울때
  const onRemoveDate = (deleteDate) => {
    const tmpOffDates = updateOffDates.filter((date) => date != deleteDate);
    setUpdateOffDates(tmpOffDates);
  };

  //holidayregularlist에서 체크박스를 토글하여 정기휴무 요일을 선택또는 해제시
  const onToggledRegularList = (e) => {
    let tmpUpdateOffWeeklyOffDays = {};
    //체크시에는 추가하고, 해제시에는 삭제
    if (e.target.checked) {
      tmpUpdateOffWeeklyOffDays = [...updateOffWeeklyOffDays, e.target.value];
    } else {
      tmpUpdateOffWeeklyOffDays = updateOffWeeklyOffDays.filter(
        (d) => d !== e.target.value,
      );
    }
    setUpdateOffWeeklyOffDays(tmpUpdateOffWeeklyOffDays);
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
          {/* <div className="partner_rental_manage_goupdateform_container">
            {isUpdatingMode ? (
              <GoUpdateFormButton
                width={"100%"}
                height={50}
                text={"대여정보 수정완료"}
                onClick={goUpdateFormClick}
              />
            ) : (
              <GoUpdateFormButton
                width={"100%"}
                height={50}
                text={"대여정보 수정"}
                onClick={goUpdateFormClick}
              />
            )}
          </div> */}
        </div>
        <div className="partner_rental_reuse_manager_partner_greencup_container">
          <div className="partner_rental_reuse_manager_container">
            <ReuseOperatorManagerInfo
              reuseOperatorName={reuse.reuseOperatorName}
              reuseOperatorManagerName={reuse.reuseManagerName}
              reuseOperatorManagerPhone={reuse.reuseManagerPhone}
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
            <div className="partner_rental_manage_title_container">
              <div className="partner_rental_manage_title">기본 설정</div>
              {isSettingInfoUpdatingMode ? (
                <GoUpdateFormButton
                  width={150}
                  height={50}
                  text={"기본 설정 수정완료"}
                  onClick={goUpdateSettingInfoFormClick}
                />
              ) : (
                <GoUpdateFormButton
                  width={150}
                  height={50}
                  text={"기본 설정 수정"}
                  onClick={goUpdateSettingInfoFormClick}
                />
              )}
            </div>

            {isSettingInfoUpdatingMode ? (
              <PartnerSettingUpdateForm
                defaultNeedCount={settingInfo.defaultNeedCount}
                defaultReturnCount={settingInfo.defaultReturnCount}
                defaultVisitTime={settingInfo.defaultVisitTime}
                onChange={partnerSettingOnChange}
              />
            ) : (
              <PartnerSetting
                defaultNeedCount={settingInfo.defaultNeedCount}
                defaultReturnCount={settingInfo.defaultReturnCount}
                defaultVisitTime={settingInfo.defaultVisitTime}
              />
            )}
            {settingTimeError ? (
              <div className="settingTimeError">
                HH:MM형식으로 시간을 입력해주세요.
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="partner_rental_manage_partner_message_total_container">
            <div className="partner_rental_manage_title_container">
              <div className="partner_rental_manage_title">비고 메세지</div>
              {isMemoUpdatingMode ? (
                <GoUpdateFormButton
                  width={150}
                  height={50}
                  text={"메시지 수정완료"}
                  onClick={goUpdateMemoFormClick}
                />
              ) : (
                <GoUpdateFormButton
                  width={150}
                  height={50}
                  text={"메시지 수정"}
                  onClick={goUpdateMemoFormClick}
                />
              )}
            </div>

            {isMemoUpdatingMode ? (
              <PartnerMessageUpdateForm
                memo={settingInfo.memo}
                onChange={partnerMemoOnChange}
              />
            ) : (
              <PartnerMessage memo={settingInfo.memo} />
            )}
          </div>
        </div>
        <div className="partner_rental_manage_holiday_container">
          <div className="partner_rental_irregular_holiday_total_container">
            <div className="partner_rental_manage_title_container">
              <div className="partner_rental_manage_title">비정기 휴무</div>
              {isIrregularUpdatingMode ? (
                <GoUpdateFormButton
                  width={180}
                  height={50}
                  text={"비정기 휴무 수정완료"}
                  onClick={goUpdateIrregularHolidayFormClick}
                />
              ) : (
                <GoUpdateFormButton
                  width={150}
                  height={50}
                  text={"비정기 휴무 수정"}
                  onClick={goUpdateIrregularHolidayFormClick}
                />
              )}
            </div>
            <div className="partner_rental_irregular_holiday_container">
              <div className="partner_rental_manage_holiday_calendar_total_container">
                <div className="partner_rental_manage_title">
                  비정기 휴무 캘린더
                </div>
                {isIrregularUpdatingMode ? (
                  <HolidayCalendarUpdateForm
                    updateOffDates={updateOffDates}
                    onChange={holidayCalendarOnChange}
                  />
                ) : (
                  <HolidayCalendar offDates={offDates} />
                )}
              </div>
              <div className="partner_rental_manage_holiday_list_total_container">
                <div className="partner_rental_manage_title">비정기 휴무일</div>
                {isIrregularUpdatingMode ? (
                  <HolidayListUpdateForm
                    updateOffDates={updateOffDates}
                    onRemoveDate={onRemoveDate}
                  />
                ) : (
                  <HolidayList offDates={offDates} />
                )}
              </div>
            </div>
          </div>

          <div className="partner_rental_manage_regular_holiday_list_total_container">
            <div className="partner_rental_manage_title_container">
              <div className="partner_rental_manage_title">정기 휴무일</div>
              {isRegularUpdatingMode ? (
                <GoUpdateFormButton
                  width={150}
                  height={50}
                  text={"정기 휴무 수정완료"}
                  onClick={goUpdateRegularHolidayFormClick}
                />
              ) : (
                <GoUpdateFormButton
                  width={150}
                  height={50}
                  text={"정기 휴무 수정"}
                  onClick={goUpdateRegularHolidayFormClick}
                />
              )}
            </div>
            {isRegularUpdatingMode ? (
              <HolidayRegularListUpdateForm
                updateOffWeeklyOffDays={updateOffWeeklyOffDays}
                onChange={onToggledRegularList}
              />
            ) : (
              <HolidayRegularList weeklyOffDays={weeklyOffDays} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
