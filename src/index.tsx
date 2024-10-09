import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Router from "./router";
import { SystemProvider } from "./contexts";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.scss";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <SystemProvider>
            <Router />
        </SystemProvider>
        <div className="position-fixed end-0 bottom-0 me-2 opacity-50 small">
            <span className="font-monospace">v{process.env.REACT_APP_VERSION}</span>
        </div>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
