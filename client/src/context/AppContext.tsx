import * as ApiClient from "./../api-client";
import { useQuery } from "react-query";
import { Toast } from "./../components";
import React from "react";

export type ToastParam = {
  children?: React.ReactNode;
  type: "success" | "error";
};

export type AppContextParam = {
  showToast: (toast: ToastParam) => void;
  isLoggedIn: boolean;
};

export const AppContext = React.createContext<AppContextParam>(null as any);

export const AppContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [toast, setToast] = React.useState<ToastParam | null>(null);
  const { isError } = useQuery("validateToken", ApiClient.validateToken, {
    retry: false,
  });

  const showToast = React.useCallback((toastMessage: ToastParam) => {
    setToast(toastMessage);
  }, []);

  const onToastClose = React.useCallback(() => {
    setToast(null);
  }, []);

  return (
    <AppContext.Provider value={{ showToast, isLoggedIn: !isError }}>
      {toast && <Toast {...toast} onClose={onToastClose} />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextParam => {
  const value = React.useContext(AppContext);
  return value;
};
