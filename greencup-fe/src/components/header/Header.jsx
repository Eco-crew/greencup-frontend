import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./Header.css";
import { REUSE_OPERATOR, PARTNER } from "../../util/constant";

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
