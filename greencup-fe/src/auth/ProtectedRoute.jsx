import { useLocation } from "react-router-dom";
//인증이 안되서, 접근 불가를 알리기 위한 페이지
import AuthRequiredPage from "../pages/login/AuthRequiredPage.jsx";
import AuthRequiredPartnerPage from "../pages/login/AuthRequiredPartnerPage.jsx";
import AuthRequiredReuseOperatorPage from "../pages/login/AuthRequiredReuseOperatorPage.jsx";

import { useAuth } from "./AuthProvider";
import { REUSE_OPERATOR, PARTNER } from "../util/constant.js";

//조건부렌더링으로 할수있는것을 모듈화 하였다고 생각하면 된다
export default function ProtectedRoute({ children }) {
  const { user, isAuthed, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: "center" }}>로딩중...</div>;
  }

  if (!isAuthed) {
    return <AuthRequiredPage />;
  }

  const path = location.pathname;

  // 역할별 허용 경로 규칙
  const allowMap = {
    // /가 이어지거나 $ 문자열 끝이면
    // () = 여러 패턴을 하나로 묶는 그룹
    [REUSE_OPERATOR]: [
      /^\/reuse-operator(\/|$)/, // /reuse-operator 아래는 전부 허용
    ],
    [PARTNER]: [
      /^\/partner(\/|$)/, // /partner 아래는 전부 허용
    ],
  };

  //?? 는 Nullish Coalescing Operator (널 병합 연산자)
  //왼쪽 값이 null 또는 undefined일 때만 오른쪽 값을 사용
  const rules = allowMap[user.role] ?? [];

  //some => 배열 안에서 조건을 만족하는 요소가 하나라도 있으면 true, 하나도 없으면 false
  //test => 정규식 메서드
  const ok = rules.some((re) => re.test(path));

  if (!ok) {
    //수거지점장인데 업체지점장 url로 접속한 경우
    if (user.role === REUSE_OPERATOR) {
      return <AuthRequiredPartnerPage />;
      //업체지점장인데 수거지점장 url로 접속한 경우
    } else if (user.role === PARTNER) {
      return <AuthRequiredReuseOperatorPage />;
    } else {
      return <AuthRequiredPage />; 
    }
    
  }

  return children;
}
