import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./Header.css";
import { REUSE_OPERATOR, PARTNER } from "../../util/constant";

/* 
const bigMenu = {
  noLogin: [
    { label: "서비스 소개", path: "/" },
    { label: "컵수거 시스템", path: "/system" },
    { label: "공지사항", path: "/notice" },
    { label: "소통 게시판", path: "/board" },
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
*/
export default function Header({ loginUser, bigMenu, linkStyle }) {
  return (
    <>
      <header className="fixedBarHeader">
        <nav className="fixedBarNav">
          {loginUser === null
            ? bigMenu.noLogin.map((menu) => (
                <NavLink
                  key={menu}
                  to="/"
                  className="fixedBarNavLink"
                  style={linkStyle()}
                >
                  {menu}
                </NavLink>
              ))
            : loginUser.role === REUSE_OPERATOR
              ? bigMenu.reuseOperator.map((menu) => (
                  <NavLink
                    key={menu}
                    to="/"
                    className="fixedBarNavLink"
                    style={linkStyle()}
                  >
                    {menu}
                  </NavLink>
                ))
              : bigMenu.partner.map((menu) => (
                  <NavLink
                    key={menu}
                    to="/"
                    className="fixedBarNavLink"
                    style={linkStyle()}
                  >
                    {menu}
                  </NavLink>
                ))}
          {/* <NavLink to="/" className="fixedBarNavLink" style={linkStyle}>
                        Home
                      </NavLink> */}
        </nav>
      </header>
    </>
  );
}
