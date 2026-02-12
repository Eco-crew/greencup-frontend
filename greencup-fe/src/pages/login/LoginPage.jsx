import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

//인증 모듈에서 로그인/로그아웃 등등 가져오기
import { useAuth } from "../../auth/AuthProvider.jsx";
import { REUSE_OPERATOR, PARTNER } from "../../util/constant";

export default function LoginPage() {
  //프론트 context에 로그인한 객체 저장
  const { isAuthed, user, login, hasLoginSession } = useAuth();

  const navigate = useNavigate();

  //입력한 아이디와 비밀번호, 그리고 수거지점장인지, 업체지점장인지
  const [loginInput, setLoginInput] = useState({
    id: "",
    pw: "",
    role: "reuseOperator",
  });
  //로그인 에러가 있는지 여부
  const [isLoginError, setIsLoginError] = useState(false);

  //딱 처음 mount 될때 세션에서 로그인이 되어있는지 검사해서 context에 넣기
  useEffect(() => {
    hasLoginSession();
    //console.log('hasLoginSession 지남');
  }, []);

  useEffect(() => {
    //console.log(loginInput);
  }, [loginInput]);

  //input tag의 변화가 있을때마다
  const inputChange = (name, value) => {
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const tryLoginDefault = async () => {
    //현재 로그인한 사용자가 수거지점장이냐 제휴지점장이냐
    //현재 로그인 백엔드 없으니 임의로 설정
    const sendLoginObject = {
      username: loginInput.id,
      password: loginInput.pw,
      userType: loginInput.role == REUSE_OPERATOR ? "reuseOperator" : "partner",
    };
    //fetch로 백엔드 로그인 확인을 거친후
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendLoginObject),
      credentials: "include", 
    });

    if (response.status == 200) {
      const data = await response.json();
      //console.log(data);

      const nextUser = {
        userId: data.id,
        userName: data.manager_name,
        role: data.userType,
      };

      console.log(nextUser);

      //일단 수거지점장일때는 요청받은 현황들로 이동
      if (nextUser.role === REUSE_OPERATOR) {
        navigate(`/reuse-operator/requests`);
      } else {
        //업체 지점장일때는 대여 기록으로 이동
        navigate(`/partner/requests`);
      }

      //usecontext에 등록
      login(nextUser);
      setIsLoginError(false);
    } else {
      setIsLoginError(true);
    }
  };

  const tryLoginNaver = async () => {
    const userType =
      loginInput.role === REUSE_OPERATOR ? "reuseOperator" : "partner";
    window.location.href = `/api/auth/naver/start?userType=${userType}`;
  };

  return (
    <>
      <div id="login_container">
        <div id="login_greencup_container">
          <div id="login_logo"></div>
          <div id="login_text">Green Cup</div>
        </div>

        <div id="loginbox_container">
          <div className="loginbox_subcontainer">
            <input
              name="id"
              id="login_id"
              className="login_input"
              placeholder="아이디를 입력해주세요."
              onChange={(e) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
            <input
              name="pw"
              id="login_pw"
              className="login_input"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              onChange={(e) => {
                inputChange(e.target.name, e.target.value);
              }}
            />
          </div>
          {/* react에서는 for를 htmlFor로 사용 */}
          {/* <div className="loginbox_subcontainer">
                   <input name="id_store" id="id_store" type="checkbox"/>     
                  
                   <label htmlFor="id_store">아이디 저장</label>
            </div> */}
          <div className="loginbox_subcontainer_flex">
            <div className="loginbox_subcontainer_flex_element">
              <input
                className="login_option"
                name="role"
                id="login_role_reuse"
                value="reuseOperator"
                type="radio"
                defaultChecked
                onChange={(e) => {
                  inputChange(e.target.name, e.target.value);
                }}
              />
              <label htmlFor="login_role_reuse">
                <div>수거지점장으로</div> <div>로그인</div>
              </label>
            </div>
            <div className="loginbox_subcontainer_flex_element">
              <input
                className="login_option"
                name="role"
                id="login_role_partner"
                value="partner"
                type="radio"
                onChange={(e) => {
                  inputChange(e.target.name, e.target.value);
                }}
              />
              <label htmlFor="login_role_partner">
                <div>업체지점장으로</div> <div>로그인</div>
              </label>
            </div>
          </div>
          <div className="loginbox_subcontainer">
            {isLoginError ? (
              <div className="login_error_message">
                로그인이 실패하였습니다. 아이디 또는 비밀번호를 확인해주세요.
              </div>
            ) : (
              ""
            )}

            <div
              id="default_login"
              onClick={() => {
                tryLoginDefault();
              }}
            >
              <span>로그인</span>
            </div>
            <div
              id="naver_login"
              onClick={() => {
                tryLoginNaver();
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
