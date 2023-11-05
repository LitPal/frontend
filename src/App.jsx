import { useState } from "react";
import { hostURL, proxyURL } from "../constants";
import axios from "axios";

import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

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
