/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.css";
import store from "./redux/store.ts";
import { CookiesProvider } from "react-cookie";
import { DarkModeProvider } from "./components/DarkModeContext/DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DarkModeProvider>
    <CookiesProvider>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </CookiesProvider>
  </DarkModeProvider>
);
