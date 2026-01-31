import './LoginPage.css';

export default function LoginPage(){
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
                    <div id="default_login">
                        로그인
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}