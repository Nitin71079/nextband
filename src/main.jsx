import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";

import { BrowserRouter }
from "react-router-dom";

import {
  ThemeProvider
} from "./context/ThemeContext";

import {
  AuthProvider
} from "./context/AuthContext";

import { Toaster }
from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster
            position="top-right"
          />

          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);