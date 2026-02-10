import { useNavigate } from "react-router-dom";

import "./TopContainer.css";

export default function TopContainer({ loginUser, logout }) {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate(`/login`);
  }

  const goHomePage = () => {
    navigate(`/`);
  }
  return (
    <>
      <div id="top_container">
        <div id="logo_container" onClick={goHomePage}>
          <img 
            src="/img/topcontainer/greencup_login_logo.png"
            alt="GreenCup 로고" ></img>
          <span className="logo_text">GreenCup</span>
        </div>

        <div id="login_info">
          {loginUser === null ? (
            <div onClick={() => {
              goLoginPage();
            }}>로그인</div>
          ) : (
            <>
              <div id="login_name">
                <img
                    src="/img/topcontainer/reuse-operator_icon.png"
                    alt="수거지점장 아이콘"
                    className="user_role_icon"
                  />
                <div>{loginUser.userName}님</div>
              </div>
              <div>고객지원</div>
              <div
                onClick={() => {
                  logout();
                  goHomePage();
                }}
              >
                로그아웃
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
