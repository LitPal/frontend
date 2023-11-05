import { useState } from "react";
import { hostURL, proxyURL } from "../constants";
import axios from "axios";

import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import DisplayPage from "./pages/DisplayPage/DisplayPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <RequireAuth authType="cookie" loginPath="/login">
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/display"
          element={
            <RequireAuth authType="cookie" loginPath="/login">
              <DisplayPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

// <EReader
//   fileURL={
//     "https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf"
//   }
// />
export default App;
