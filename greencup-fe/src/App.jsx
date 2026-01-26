import { useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";

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
  const [count, setCount] = useState(0);

  const linkStyle = ({ isActive }) => ({
    background: isActive ? "rgba(0,0,0,0.08)" : "transparent",
  });

  const REUSE_OPERATOR = "reuseOperator";
  const PARTNER = "partner";

  //현재 로그인한 사용자가 수거지점장이냐 제휴지점장이냐
  //현재 로그인 없으니 임의로 설정
  const loginUser = REUSE_OPERATOR;

  //수거지점장일 경우, 제휴 지점장일 경우 메뉴 목록
  const bigMenu = {
    reuseOperator: ["요청 현황", "대여 현황", "수거 목록 통계"],
    partner: ["대여 관리", "대여 기록", "요청 및 반납 통계"],
  };

  return (
    <>
      <div className="fixedBar">
        <div className="fixedBarContentCenter">
          <header className="fixedBarHeader">
            <nav className="fixedBarNav">
              {loginUser === REUSE_OPERATOR
                ? bigMenu.reuseOperator.map((menu) => (
                    <NavLink
                      key={menu}
                      to="/"
                      className="fixedBarNavLink"
                      style={linkStyle}
                    >
                      {menu}
                    </NavLink>
                  ))
                : bigMenu.partner.map((menu) => (
                    <NavLink
                      key={menu}
                      to="/"
                      className="fixedBarNavLink"
                      style={linkStyle}
                    >
                      {menu}
                    </NavLink>
                  ))}
              {/* <NavLink to="/" className="fixedBarNavLink" style={linkStyle}>
                Home
              </NavLink> */}
            </nav>
          </header>
        </div>
      </div>

      {/* 헤더 높이만큼 밀기 */}
      <main style={{ marginTop: 200 }}>
        {/* <main> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}

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
    </>
  );
}

export default App;
