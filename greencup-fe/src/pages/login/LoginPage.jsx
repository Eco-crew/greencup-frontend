import { useState } from "react";

import "./LoginPage.css";

//인증 모듈에서 로그인/로그아웃 등등 가져오기
import { useAuth } from "../../auth/AuthProvider.jsx";
import { REUSE_OPERATOR, PARTNER } from "../../util/constant";

export default function LoginPage() {
  const { isAuthed, user, login } = useAuth();

  const [loginInput, setLoginInput] = useState({ id: "", pw: "" });

  const inputChange = (name, value) => {
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const tryLogin = () => {
    //현재 로그인한 사용자가 수거지점장이냐 제휴지점장이냐
    //현재 로그인 백엔드 없으니 임의로 설정
    const nextUser = { role: REUSE_OPERATOR };

    //fetch로 백엔드 로그인 확인을 거친후
    login(nextUser);
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
              <input className="login_option" name="login_role"  id="login_role_reuse"  value="reuse" type="radio" />
              <label htmlFor="login_role_reuse"><div>수거지점장으로</div> <div>로그인</div></label>
            </div>
            <div className="loginbox_subcontainer_flex_element">
              <input className="login_option" name="login_role" id="login_role_partner"  value="partner" type="radio" />
              <label htmlFor="login_role_partner"><div>업체지점장으로</div> <div>로그인</div></label>
            </div>
          </div>
          <div className="loginbox_subcontainer">
            <div
              id="default_login"
              onClick={() => {
                tryLogin();
              }}
            >
              <span>로그인</span>
            </div>
            <div
              id="naver_login"
              onClick={() => {
                tryLogin();
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
