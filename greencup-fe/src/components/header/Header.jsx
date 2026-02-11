import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import "./Header.css";
import { REUSE_OPERATOR, PARTNER } from "../../util/constant";

export default function Header({ loginUser, bigMenu }) {
  return (
    <>
      <header className="fixedBarHeader">
        <nav className="fixedBarNav">
          {loginUser === null
            ? bigMenu.noLogin.map((menu) =>
                // navlink의 end 옵션 => url 부분 매칭을 끄고, 정확 매칭으로
                //isActive => NavLink가 내부적으로 객체를 넘겨주는데 특정 속성

                menu.path === "#" ? (
                  <div
                    key={menu.label}
                    className="fixedBarNavLink"
                    onClick={() => alert("준비중입니다")}
                    end
                  >
                    {menu.label}
                  </div>
                ) : (
                  <NavLink
                    key={menu.label}
                    to={menu.path}
                    className={({ isActive }) =>
                      "fixedBarNavLink" + (isActive ? " active" : "")
                    }
                    end
                  >
                    {menu.label}
                  </NavLink>
                ),
              )
            : loginUser.role === REUSE_OPERATOR
              ? bigMenu.reuseOperator.map((menu) => (
                  <NavLink
                    key={menu.label}
                    to={menu.path}
                    className={({ isActive }) =>
                      "fixedBarNavLink" + (isActive ? " active" : "")
                    }
                    end
                  >
                    {menu.label}
                  </NavLink>
                ))
              : bigMenu.partner.map((menu) => (
                  <NavLink
                    key={menu.label}
                    to={menu.path}
                    className={({ isActive }) =>
                      "fixedBarNavLink" + (isActive ? " active" : "")
                    }
                    end
                  >
                    {menu.label}
                  </NavLink>
                ))}
        </nav>
      </header>
    </>
  );
}
