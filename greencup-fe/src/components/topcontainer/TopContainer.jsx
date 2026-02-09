import { useNavigate } from "react-router-dom";

import "./TopContainer.css";

export default function TopContainer({ loginUser, logout }) {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate(`/login`);
  }

  return (
    <>
      <div id="top_container">
        <div id="logo_container">
          <div>로고</div>
          <div>GreenCup</div>
        </div>

        <div id="login_info">
          {loginUser === null ? (
            <div onClick={() => {
              goLoginPage();
            }}>로그인</div>
          ) : (
            <>
              <div id="login_name">
                <div>img</div>
                <div>김수거님</div>
              </div>
              <div>고객지원</div>
              <div
                onClick={() => {
                  logout();
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
