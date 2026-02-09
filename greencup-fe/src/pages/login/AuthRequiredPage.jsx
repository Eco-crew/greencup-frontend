import "./AuthRequiredPage.css";

import { Link } from "react-router-dom";

export default function AuthRequiredPage() {
  return (
    <div className="login_required_container">
      <div className="login_required_card">
        <h2>로그인이 필요합니다.</h2>
        <p>
          이 페이지는 로그인한 사용자만 접근할 수 있습니다. <br />
          로그인 후 다시 시도해 주세요.
        </p>

        <Link to="/login" className="login_required_button">
          로그인 하러 가기
        </Link>
      </div>
    </div>
  );
}
