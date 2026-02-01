import { useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import { REUSE_OPERATOR, PARTNER } from "./util/constant";

import LoginPage from "./pages/login/LoginPage";
//인증 모듈에서 로그인/로그아웃 등등 가져오기
import { useAuth } from './auth/AuthProvider.jsx';

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

import PartnerRequestSettingsPage from "./pages/partner/request/PartnerRequestSettingsPage";
import PartnerRequestsPage from "./pages/partner/request/PartnerRequestsPage";
import PartnerStatsPage from "./pages/partner/stats/PartnerStatsPage";

function App() {
  const { isAuthed, user, logout } = useAuth();

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

  return (
    <>
      <div className="wrapper">
        <div className="fixedBar">
          <div className="fixedBarContentCenter">
            <TopContainer logout={logout}/>
            <Header
              loginUser={user}
              bigMenu={bigMenu}
              linkStyle={linkStyle}
            />
          </div>
        </div>

        <main className="main">
          {/* <main> */}
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
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
