import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout, SignupPage, SigninPage } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import { AppContextProvider } from "./context/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
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
            <Route
              path="/auth/signin"
              element={
                <MainLayout>
                  <SigninPage />
                </MainLayout>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <MainLayout>
                  <SignupPage />
                </MainLayout>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
