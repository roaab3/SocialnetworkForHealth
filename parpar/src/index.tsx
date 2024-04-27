import ReactDOM from "react-dom/client";
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./global.module.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="">
    <App />
    </GoogleOAuthProvider>
  </Provider>
);

reportWebVitals();
