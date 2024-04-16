import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/HomePage.tsx";
import "./index.css";
import { SWRConfig } from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
