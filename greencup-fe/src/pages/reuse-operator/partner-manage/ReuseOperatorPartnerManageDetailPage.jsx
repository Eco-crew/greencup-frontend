import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ReuseOperatorPartnerManageDetailPage.css";

import HolidayCalendar from "../../../components/reuse-operator/partner-manage/detail/holiday/HolidayCalendar";
import HolidayList from "../../../components/reuse-operator/partner-manage/detail/holiday/HolidayList";

import { fetchDetailReusePartner } from "../../../api/dummyReusePartners";

export default function ReuseOperatorPartnerManageDetailPage() {
  //url로 받은 partnerId
  const { partnerId } = useParams();
  //console.log(partnerId);

  //partnerId 조회한 해당 partner의 partner 항목
  const [partner, setPartner] = useState({});
  //partnerId 조회한 해당 partner의 settingInfo 항목
  const [settingInfo ,setSettingInfo] = useState({});
  //partnerId 조회한 해당 partner의 weeklyOffDays 항목
  const [weeklyOffDays, setWeeklyOffDays] = useState([]);
  //partnerId 조회한 해당 partner의 offDates 항목
  const [offDates,setOffDates] = useState([]);
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
        <div className="reuse_partner_manage_holiday-container">
          <HolidayCalendar offDates={offDates}/>
          <HolidayList offDates={offDates}/>
        </div>
      </div>
    </>
  );
}
