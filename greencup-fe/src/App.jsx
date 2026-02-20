import { useState, createContext, useMemo } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";

import LoginPage from "./pages/login/LoginPage";
import TopContainer from "./components/topcontainer/TopContainer";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";

import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/not-found/NotFound";

import ReuseOperatorRequestPage from "./pages/reuse-operator/request/ReuseOperatorRequestPage";
import ReuseOperatorRequestDetailPage from "./pages/reuse-operator/request/ReuseOperatorRequestDetailPage";
import ReuseOperatorPartnerManagePage from "./pages/reuse-operator/partner-manage/ReuseOperatorPartnerManagePage";
import ReuseOperatorPartnerManageDetailPage from "./pages/reuse-operator/partner-manage/ReuseOperatorPartnerManageDetailPage";
import ReuseOperatorStatsPage from "./pages/reuse-operator/stats/ReuseOperatorStatsPage";

import ModalBackground from "./components/reuse-operator/util/modal/ModalBackground.jsx";
import CancelModal from "./components/reuse-operator/request/list/cancelmodal/CancelModal.jsx";

import PartnerRequestSettingsPage from "./pages/partner/rental-manage/PartnerRequestSettingsPage";
import PartnerRequestsPage from "./pages/partner/request/PartnerRequestsPage";
import PartnerStatsPage from "./pages/partner/stats/PartnerStatsPage";
import CompleteModal from "./components/reuse-operator/request/list/completemodal/CompleteModal.jsx";

import { REUSE_OPERATOR, PARTNER } from "./util/constant";
import { checkMissedCount } from "./util/utilFunction.js";

//인증 모듈에서 로그인/로그아웃 등등 가져오기
import { useAuth } from "./auth/AuthProvider.jsx";

//상태 저장하기 위한 context
//수거지점장-요청현황에서 취소버튼을 누를시의 함수
//수거지점장-요청현황에서 완료버튼을 누를시의 함수
//이것들을 특정 어느 컴포넌트던지 자유롭게 사용할수있도록
export const reuseContext = createContext(null);

function App() {
  const { isAuthed, user, logout } = useAuth();

  //수거지점장일 경우, 제휴 지점장일 경우 메뉴 목록
  const bigMenu = {
    noLogin: [
      { label: "서비스 소개", path: "/" },
      { label: "컵수거 시스템", path: "#" },
      { label: "공지사항", path: "#" },
      { label: "소통 게시판", path: "#" },
    ],

    reuseOperator: [
      { label: "요청 현황", path: "/reuse-operator/requests" },
      { label: "대여 현황", path: "/reuse-operator/partner-manage" },
      { label: "수거 목록 통계", path: "/reuse-operator/stats" },
    ],

    partner: [
      { label: "대여 관리", path: "/partner/request-settings" },
      { label: "대여 기록", path: "/partner/requests" },
      { label: "요청 및 반납 통계", path: "/partner/stats" },
    ],
  };

  //--------------------수거지점장 미완료로 변경 영역-----------------------
  //수거지점장-요청현황-미완료로 변경 모달 띄울지 여부
  const [reuseCancelModalOpen, setReuseCancelModalOpen] = useState(false);
  //수거지점장-요청현황-미완료로 변경 모달시, 현재 관련있는 요청 아이디
  const [reuseCancelRequestId, setReuseCancelRequestId] = useState("");

  //변경후, 페이지내에서 다시 수정한 목록을 바로 보여줘야하는데 그러면 바로 fetch를 실행해야함
  //하지만 여기서는 react query를 사용할수없으므로 임의로 useEffect에 의존성배열을 변화시키기 위해 사용
  const [reuseCancelReloadKey, setReuseCancelReloadKey] = useState(0);
  const reuseCancelTriggerReload = () => {
    setReuseCancelReloadKey((k) => k + 1);
  };

  //수거지점장-요청현황-미완료로 변경 모달에서 취소버튼을 클릭시
  const reuseCancel_CancelClick = () => {
    //reusecancelmodal open 상태변수를 바꾸자
    setReuseCancelModalOpen(false);
  };

  //수거지점장-요청현황-미완료로 변경 모달에서 확인버튼을 클릭시
  const reuseCancel_ConfirmClick = async () => {
    //요청아이디 상태변수를 가져온다
    //fetch로 요청 미완료로 업데이트
    const response = await fetch(
      `/api/reuse-operator/requests/${reuseCancelRequestId}/uncomplete`,
      {
        method: "PUT",
        credentials: "include", // 세션에 관한 쿠키도 꼭 전송
      },
    );

    if (response.ok) {
      const data = await response.json();
      alert("요청 미완료로 변경 성공");

      //아래 페이지 컴포넌트에서 강제로 useEffect를 또 실행시키기 위해
      reuseCancelTriggerReload();

      //reusecancelmodal open 상태변수를 바꾸자
      setReuseCancelModalOpen(false);
    } else {
      alert("요청 미완료로 변경 실패");
    }

    //console.log("reuseCancel_ConfirmClick 눌림");
  };

  //수거지점장-요청현황에서 취소버튼을 누를시
  const reuseRequestCancelClick = (requestId) => {
    //reusecancelmodal open 상태변수를 바꾸자
    setReuseCancelModalOpen(true);

    //요청아이디 상태변수를 지정
    setReuseCancelRequestId(requestId);
    //console.log(requestId);
  };
  //--------------------수거지점장 미완료로 변경 영역 끝-----------------------

  //--------------------수거지점장 완료로 변경 영역-----------------------
  //수거지점장-요청현황-완료로 변경 모달 띄울지 여부
  const [reuseCompleteModalOpen, setReuseCompleteModalOpen] = useState(false);
  //수거지점장-요청현황-완료로 변경 모달시, 현재 관련있는 요청 아이디
  const [reuseCompleteRequestId, setReuseCompleteRequestId] = useState("");
  //수거지점장-요청현황-완료로 변경 모달시, 파손 및 분실한 개수
  const [reuseCompleteMissedCount, setReuseCompleteMissedCount] = useState(0);
  //수거지점장-요청현황-완료로 변경 모달시, 파손 및 분실한 개수의 유효여부
  const [reuseCompleteMissedCountValid, setReuseCompleteMissedCountValid] =
    useState(true);

  //변경후, 페이지내에서 다시 수정한 목록을 바로 보여줘야하는데 그러면 바로 fetch를 실행해야함
  //하지만 여기서는 react query를 사용할수없으므로 임의로 useEffect에 의존성배열을 변화시키기 위해 사용
  const [reuseCompleteReloadKey, setReuseCompleteReloadKey] = useState(0);
  const reuseCompleteTriggerReload = () => {
    setReuseCompleteReloadKey((k) => k + 1);
  };

  //수거지점장-요청현황-완료로 변경 모달에서 취소버튼을 클릭시
  const reuseComplete_CancelClick = () => {
    //reuseCompletemodal open 상태변수를 바꾸자
    setReuseCompleteModalOpen(false);
    setReuseCompleteMissedCountValid(true);
  };

  //수거지점장-요청현황-완료로 변경 모달에서 확인버튼을 클릭시
  const reuseComplete_ConfirmClick = async () => {
    //요청아이디 상태변수를 가져온다
    //파손 및 분실된 컵 상태변수를 가져온다
    //유효성 검증을 한다
    const validResult = await checkMissedCount(reuseCompleteMissedCount);

    setReuseCompleteMissedCountValid(validResult);

    //유효성 검증이 true일때만 업데이트 실행
    if (validResult) {
      //fetch로 분실 컵 업데이트
      const response = await fetch(
        `/api/reuse-operator/requests/${reuseCompleteRequestId}/broken-lost`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brokenLostCount: reuseCompleteMissedCount }),
          credentials: "include", // 세션에 관한 쿠키도 꼭 전송
        },
      );

      if (response.ok) {
        const data = await response.json();
        alert("파손 및 분실개수 변경 성공");

        //fetch로 요청 완료 처리
        console.log(reuseCompleteMissedCount);
        const response2 = await fetch(
          `/api/reuse-operator/requests/${reuseCompleteRequestId}/complete`,
          {
            method: "PUT",
            credentials: "include", // 세션에 관한 쿠키도 꼭 전송
          },
        );

        if (response2.ok) {
          const data = await response2.json();
          alert("요청 완료 처리 변경 성공");
          //아래 페이지 컴포넌트에서 강제로 useEffect를 또 실행시키기 위해
          reuseCompleteTriggerReload();

          //reusecancelmodal open 상태변수를 바꾸자
          setReuseCompleteModalOpen(false);
        } else {
          alert("요청 완료 처리 변경 실패");
        }
      } else {
        alert("파손 및 분실개수 변경 실패");
      }
    }

    //console.log("reuseComplete_ConfirmClick 눌림");
  };

  //수거지점장-요청현황-완료로 변경 모달에서 숫자입력을 할시
  const reuseCompleteInputChange = (missedCount) => {
    //파손및 분실된 컵을 업데이트한다
    setReuseCompleteMissedCount(missedCount);
  };

  //수거지점장-요청현황에서 완료버튼을 누를시
  const reuseRequestCompleteClick = (requestId) => {
    //reusecancelmodal open 상태변수를 바꾸자
    setReuseCompleteModalOpen(true);

    //요청아이디 상태변수를 지정
    setReuseCompleteRequestId(requestId);
    //console.log(requestId);
  };
  //--------------------수거지점장 완료로 변경 영역 끝-----------------------

  const reuseValue = useMemo(() => {
    return {
      reuseRequestCancelClick,
      reuseCancelReloadKey,
      reuseRequestCompleteClick,
      reuseCompleteReloadKey,
    };
  }, [
    reuseRequestCancelClick,
    reuseCancelReloadKey,
    reuseRequestCompleteClick,
    reuseCompleteReloadKey,
  ]);

  return (
    <>
      {/* 모달을 넣을꺼면 여기에 */}
      {reuseCancelModalOpen ? (
        <ModalBackground>
          <CancelModal
            width={500}
            height={300}
            confirmClick={reuseCancel_ConfirmClick}
            cancelClick={reuseCancel_CancelClick}
          />
        </ModalBackground>
      ) : (
        ""
      )}

      {reuseCompleteModalOpen ? (
        <ModalBackground>
          <CompleteModal
            width={500}
            height={350}
            confirmClick={reuseComplete_ConfirmClick}
            cancelClick={reuseComplete_CancelClick}
            inputChange={reuseCompleteInputChange}
            reuseCompleteMissedCountValid={reuseCompleteMissedCountValid}
          />
        </ModalBackground>
      ) : (
        ""
      )}

      <div className="wrapper">
        <div className="fixedBar">
          <div className="fixedBarContentCenter">
            <TopContainer loginUser={user} logout={logout} />
            <Header loginUser={user} bigMenu={bigMenu} />
          </div>
        </div>

        <main className="main">
          {/* <main> */}
          <reuseContext.Provider value={reuseValue}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* 주의사항: 자식은 상대경로로 쓴다 */}
              {/* 수거지점장 */}

              <Route path="/reuse-operator">
                {/* 요청받은 현황들 */}
                <Route
                  path="requests"
                  element={
                    <ProtectedRoute>
                      <ReuseOperatorRequestPage />
                    </ProtectedRoute>
                  }
                />
                {/* 요청받은 현황들 상세페이지 */}
                <Route
                  path="requests/:requestId"
                  element={
                    <ProtectedRoute>
                      <ReuseOperatorRequestDetailPage />
                    </ProtectedRoute>
                  }
                />
                {/* 업체관리 페이지 */}
                <Route
                  path="partner-manage"
                  element={
                    <ProtectedRoute>
                      <ReuseOperatorPartnerManagePage />
                    </ProtectedRoute>
                  }
                />
                {/* 업체관리 상세 페이지 */}
                <Route
                  path="partner-manage/:partnerId"
                  element={
                    <ProtectedRoute>
                      <ReuseOperatorPartnerManageDetailPage />
                    </ProtectedRoute>
                  }
                />
                {/* 수거목록 통계 페이지 */}
                <Route
                  path="stats"
                  element={
                    <ProtectedRoute>
                      <ReuseOperatorStatsPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* 제휴 지점장 */}
              <Route path="/partner">
                {/* 대여 관리 및 수정 */}
                <Route
                  path="request-settings"
                  element={
                    <ProtectedRoute>
                      <PartnerRequestSettingsPage />
                    </ProtectedRoute>
                  }
                />
                {/*전체 목록, 요청중인 목록, 대여 및 반납 완료된 목록, 취소한 목록,*/}
                <Route
                  path="requests"
                  element={
                    <ProtectedRoute>
                      <PartnerRequestsPage />
                    </ProtectedRoute>
                  }
                />
                {/* 이용 통계 페이지 */}
                <Route
                  path="stats"
                  element={
                    <ProtectedRoute>
                      <PartnerStatsPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* 후순위-마이페이지 */}
              <Route path="/me">
                <Route path="reuse-operator" />
                <Route path="partner" />
              </Route>

              {/* 404 페이지 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </reuseContext.Provider>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
