import { useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 수거지점장 */}
          <Route path="/reuse-operator">
            {/* 요청받은 현황들 */}
            <Route path="/requests" />
            {/* 요청받은 현황들 상세페이지 */}
            <Route path="/requests/:requestId" />
            {/* 업체관리 페이지 */}
            <Route path="/partner-manage" />
            {/* 업체관리 상세 페이지 */}
            <Route path="/partner-manage/:partnerId" />
            {/* 수거목록 통계 페이지 */}
            <Route path="/stats" />
          </Route>

          {/* 업체관리 페이지 */}
          {/* 후순위-마이페이지 */}
          <Route path="/me">
            <Route path="/reuse-operator" />
            <Route path="/partner" />
          </Route>

          {/* 404 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
