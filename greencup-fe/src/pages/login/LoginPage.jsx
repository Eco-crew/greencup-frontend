import './LoginPage.css';

//인증 모듈에서 로그인/로그아웃 등등 가져오기
import { useAuth } from '../../auth/AuthProvider.jsx';
import {REUSE_OPERATOR,PARTNER} from '../../util/constant';

export default function LoginPage(){
    const { isAuthed, user, login } = useAuth();
    
    const tryLogin = () => {
        //현재 로그인한 사용자가 수거지점장이냐 제휴지점장이냐
        //현재 로그인 없으니 임의로 설정
        const nextUser = {role:REUSE_OPERATOR};
        login(nextUser);
    }
    
    return(
        <>
        <div id="login_container">
            <div id="login_greencup_container">
                <div id="login_logo">

                </div>
                <div id="login_text">
                    Green Cup
                </div>
            </div>

            <div id="loginbox_container">
                <div className="loginbox_subcontainer">
                    <input name="login_id" id="login_id" className="login_input" placeholder="아이디를 입력해주세요."/>
                    <input name="login_pw" id="login_pw" className="login_input" placeholder="비밀번호를 입력해주세요."/>
                    
                </div>
                <div className="loginbox_subcontainer">
                   <input name="id_store" id="id_store" type="checkbox"/>     
                   {/* react에서는 for를 htmlFor로 사용 */}
                   <label htmlFor="id_store">아이디 저장</label>
                </div>
                <div className="loginbox_subcontainer">
                    <div id="default_login" onClick={()=>{tryLogin()}}>
                        <span>로그인</span>
                    </div>
                    <div id="naver_login" onClick={()=>{tryLogin()}}></div>
                </div>
            </div>
        </div>
        </>
    )
}