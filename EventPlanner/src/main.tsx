import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./pages/TestingPage.tsx";
import "./index.css";
import { SWRConfig } from "swr";
import RegisterForm from "./pages/RegisterPage.tsx";
import LoginForm from "./pages/LoginPage.tsx";
// import LoginForm from "./pages/LoginPage.tsx";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <RegisterForm />
      <LoginForm />
    </SWRConfig>
  </React.StrictMode>
);
