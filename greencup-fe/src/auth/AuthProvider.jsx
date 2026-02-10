import { useState, useEffect, createContext, useContext, useMemo } from "react";

//usecontext 모듈화

//세션 스토리지에 넣어 브라우저가 닫히면 삭제
const STORAGE_KEY = "auth_user";
const storage = sessionStorage;

//상태 저장하기 위한 context
const AuthContext = createContext(null);

//children은 App
//컴포넌트인데 provider를 리턴하는것뿐
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  //로그인 여부 context 불러오는것을 마치기전, ProtectedRoute에서 isAuthed를 false로 인식하기전에
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storageBoot = async () => {
      await hasLoginSession();
    };

    storageBoot();
  }, []);

  //세션이 있는지 fetch를 날림
  const hasLoginSession = async () => {
    const response = await fetch(`/api/auth/check-login`, {
      method: "GET",
      credentials: "include", // 세션 쿠키 전송
      headers: { Accept: "application/json" }, //서버가 응답을 JSON 형태로 보내주길 바람
    });

    if (response.status == 200) {
      const data = await response.json();

      console.log(data);
      //세션이 있다고 하면
      if (data?.isLoggedIn) {
        console.log("백엔드 세션 존재");
        //storage 읽고 세팅
        const raw = storage.getItem(STORAGE_KEY);

        if (!raw) {
          const nextUser = {
            userId: data.id,
            userName: data.manager_name,
            role: data.userType,
          };
          setUser(nextUser);
          setIsLoading(false);
          return;
        }

        try {
          const parsed = JSON.parse(raw);
          setUser(parsed);
        } catch (err) {
          storage.removeItem(STORAGE_KEY);
        } finally {
          setIsLoading(false);
        }
      }
      //    else {
      //     console.log("백엔드 세션 없음 isloggedin false");
      //     setUser(null);
      //     storage.removeItem(STORAGE_KEY);
      //     setIsLoading(false);
      //   }
    } else {
      console.log("백엔드 세션 없음");
      setUser(null);
      storage.removeItem(STORAGE_KEY);
      setIsLoading(false);
    }
  };

  const login = async (nextUser) => {
    setUser(nextUser);
    storage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    await hasLoginSession();
  };

  const logout = () => {
    setUser(null);
    storage.removeItem(STORAGE_KEY);
    //세션에 없애기 요청을 해야함
  };

  //의존성 배열이 없으면 → 사실상 매 렌더마다 다시 계산
  const value = useMemo(() => {
    return {
      user,
      isAuthed: !!user,
      isLoading,
      login,
      logout,
      hasLoginSession,
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//커스텀훅 => use로 시작하고, 내부에서 다른 hook을 호출, JSX를 리턴하지 않는 함수
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "접근불가 <AuthContext>를 감싸지 않은 컴포넌트에서 나를 호출했음",
    );
  }

  return ctx;
}
