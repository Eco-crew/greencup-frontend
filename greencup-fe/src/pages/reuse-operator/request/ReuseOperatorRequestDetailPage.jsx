import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ReuseOperatorRequestDetailPage.css";

import PartnerInfo from "../../../components/reuse-operator/request/detail/PartnerInfo";
import PartnerManagerInfo from "../../../components/reuse-operator/request/detail/PartnerManagerInfo";
import PartnerMap from "../../../components/reuse-operator/request/detail/PartnerMap";
import PartnerGreenCupInfo from "../../../components/reuse-operator/request/detail/PartnerGreenCupInfo";
import PartnerMessage from "../../../components/reuse-operator/request/detail/PartnerMessage";

import GoListButton from "../../../components/reuse-operator/util/golist-button/GoListButton";

import { fetchDetailReuseRequest } from "../../../api/dummyReuseRequests";
import { reuseContext } from "../../../App";

export default function ReuseOperatorRequestDetailPage() {
  //url로 받은 requestId
  const { requestId } = useParams();

  console.log(requestId);

  //수거지점장-요청현황에서 취소버튼 혹은 완료버튼 누를시 함수를 가져옴
  const {
    reuseRequestCancelClick,
    reuseCancelReloadKey,
    reuseRequestCompleteClick,
    reuseCompleteReloadKey,
  } = useContext(reuseContext);

  //requestId로 조회한 해당 request 항목
  const [request, setRequest] = useState({});
  //fetch로 불러올동안 로딩중 여부
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //해당 항목 불러온후 상태관리하는 함수
  const handleFetchReuseRequest = (requestId) => {
    fetchDetailReuseRequest(requestId).then((data) => {
      //한개이므로
      setRequest(data.requests[0]);
      //console.log(data.requests);

      setLoading(false);
    });
  };

  //주의 useEffect 인자에 직접적으로 async를 쓰면 안된다. 차라리 fetch then은 가능
  useEffect(() => {
    //기본 mount 되자마자
    //fetch로 요청 내용 정보 설정
    handleFetchReuseRequest(requestId);
    console.log('key때문에?');
  }, [reuseCancelReloadKey, reuseCompleteReloadKey]);

  //완료 버튼을 누를시 실행해야하는것
  const afterCompleted = (e) => {
    //console.log(e.currentTarget.dataset.id);
    reuseRequestCompleteClick(e.currentTarget.dataset.id);
  };

  //취소 버튼을 누를시 실행해야하는것
  const afterCanceled = (e) => {
    //console.log(e.currentTarget.dataset.id);
    reuseRequestCancelClick(e.currentTarget.dataset.id);
  };

  //목록으로 버튼 클릭시 실행해야하는것
  const goListClick = () => {
    navigate("/reuse-operator/requests");
  };

  return (
    <>
      <div className="reuse_request_detail_container">
        <div className="reuse_request_detail_partner_container">
          <div className="reuse_request_detail_partner_info_container">
            <PartnerInfo partnerName={request.partnerName}/>
            <PartnerManagerInfo />
          </div>
          <PartnerMap />
        </div>
        <PartnerGreenCupInfo />
        <div className="reuse_request_detail_partner_message_container">
          <PartnerMessage />
          <div className="reuse_request_detail_golist_container">
            <GoListButton width={200} height={50} onClick={goListClick} />
          </div>
        </div>
      </div>
    </>
  );
}
