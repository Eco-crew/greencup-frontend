import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* 우리앱 입장에서는 전역 저장소 */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
