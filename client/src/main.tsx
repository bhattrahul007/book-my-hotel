import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./pages/MainLayout";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <p>Home page</p>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
