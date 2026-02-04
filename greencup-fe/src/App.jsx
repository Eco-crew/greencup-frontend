import { useState, createContext, useMemo } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import { REUSE_OPERATOR, PARTNER } from "./util/constant";

import LoginPage from "./pages/login/LoginPage";
//인증 모듈에서 로그인/로그아웃 등등 가져오기
import { useAuth } from "./auth/AuthProvider.jsx";

import TopContainer from "./components/topcontainer/TopContainer";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/not-found/NotFound";

import ReuseOperatorRequestPage from "./pages/reuse-operator/request/ReuseOperatorRequestPage";
import ReuseOperatorRequestDetailPage from "./pages/reuse-operator/request/ReuseOperatorRequestDetailPage";
import ReuseOperatorPartnerManagePage from "./pages/reuse-operator/partner-manage/ReuseOperatorPartnerManagePage";
import ReuseOperatorPartnerManageDetailPage from "./pages/reuse-operator/partner-manage/ReuseOperatorPartnerManageDetailPage";
import ReuseOperatorStatsPage from "./pages/reuse-operator/stats/ReuseOperatorStatsPage";

import ModalBackground from "./components/reuse-operator/util/modal/ModalBackground.jsx";
import CancelModal from "./components/reuse-operator/request/list/cancelmodal/CancelModal.jsx";

import PartnerRequestSettingsPage from "./pages/partner/request/PartnerRequestSettingsPage";
import PartnerRequestsPage from "./pages/partner/request/PartnerRequestsPage";
import PartnerStatsPage from "./pages/partner/stats/PartnerStatsPage";

//상태 저장하기 위한 context
//수거지점장-요청현황에서 취소버튼을 누를시의 함수
//수거지점장-요청현황에서 완료버튼을 누를시의 함수
//이것들을 특정 어느 컴포넌트던지 자유롭게 사용할수있도록
export const reuseContext = createContext(null);

function App() {
  const { isAuthed, user, logout } = useAuth();

  //수거지점장-요청현황-미완료로 변경 모달 띄울지 여부
  const [reuseCancelModalOpen, setReuseCancelModalOpen] = useState(false);
  //수거지점장-요청현황-미완료로 변경 모달시, 현재 관련있는 요청 아이디
  const [reuseCancelRequestId, setReuseCancelRequestId] = useState("");

  //필요시 주석풀고 커스텀할것
  const linkStyle = () => ({
    //const linkStyle = ({ isActive }) => ({
    // background: isActive ? "rgba(0,0,0,0.08)" : "transparent",
  });

  //수거지점장일 경우, 제휴 지점장일 경우 메뉴 목록
  const bigMenu = {
    reuseOperator: ["요청 현황", "대여 현황", "수거 목록 통계"],
    partner: ["대여 관리", "대여 기록", "요청 및 반납 통계"],
    noLogin: ["서비스 소개", "컵수거 시스템", "공지사항", "소통 게시판"],
  };

  //수거지점장-요청현황-모달에서 취소버튼을 클릭시
  const cancelClick = () => {
    //reusecancelmodal open 상태변수를 바꾸자
    setReuseCancelModalOpen(false);
  };

  //수거지점장-요청현황-모달에서 확인버튼을 클릭시
  const confirmClick = () => {
    //reusecancelmodal open 상태변수를 바꾸자
    setReuseCancelModalOpen(false);

    //요청아이디 상태변수를 가져온다
    //fetch로 completed false로 업데이트
  };

  //수거지점장-요청현황에서 취소버튼을 누를시
  const reuseRequestCancelClick = (requestId) => {
    //reusecancelmodal open 상태변수를 바꾸자
    setReuseCancelModalOpen(true);

    //요청아이디 상태변수를 지정
    setReuseCancelRequestId(requestId);
    console.log(requestId);
  };

  const reuseValue = useMemo(() => {
    return {
      reuseRequestCancelClick,
    };
  }, []);

  return (
    <>
      {/* 모달을 넣을꺼면 여기에 */}
      {reuseCancelModalOpen ? (
        <ModalBackground>
          <CancelModal
            width={500}
            height={300}
            confirmClick={confirmClick}
            cancelClick={cancelClick}
          />
        </ModalBackground>
      ) : (
        ""
      )}

      <div className="wrapper">
        <div className="fixedBar">
          <div className="fixedBarContentCenter">
            <TopContainer logout={logout} />
            <Header loginUser={user} bigMenu={bigMenu} linkStyle={linkStyle} />
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
                <Route path="requests" element={<ReuseOperatorRequestPage />} />
                {/* 요청받은 현황들 상세페이지 */}
                <Route
                  path="requests/:requestId"
                  element={<ReuseOperatorRequestDetailPage />}
                />
                {/* 업체관리 페이지 */}
                <Route
                  path="partner-manage"
                  element={<ReuseOperatorPartnerManagePage />}
                />
                {/* 업체관리 상세 페이지 */}
                <Route
                  path="partner-manage/:partnerId"
                  element={<ReuseOperatorPartnerManageDetailPage />}
                />
                {/* 수거목록 통계 페이지 */}
                <Route path="stats" element={<ReuseOperatorStatsPage />} />
              </Route>

              {/* 제휴 지점장 */}
              <Route path="/partner">
                {/* 대여 관리 및 수정 */}
                <Route
                  path="request-settings"
                  element={<PartnerRequestSettingsPage />}
                />
                {/*전체 목록, 요청중인 목록, 대여 및 반납 완료된 목록, 취소한 목록,*/}
                <Route path="requests" element={<PartnerRequestsPage />} />
                {/* 이용 통계 페이지 */}
                <Route path="stats" element={<PartnerStatsPage />} />
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
