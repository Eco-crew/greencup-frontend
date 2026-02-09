import "./AuthRequiredPage.css";

import { Link } from "react-router-dom";

export default function AuthRequiredReuseOperatorPage() {
  return (
    <div className="login_required_container">
      <div className="login_required_card">
        <h2>접근 권한이 없습니다.</h2>
        <p>
          이 페이지는 수거지점장 역할로 로그인한 사용자만 접근할 수 있습니다. <br />
        </p>

        <Link to="/" className="login_required_button">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
