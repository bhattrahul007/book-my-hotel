import { useMutation, useQueryClient } from "react-query";
import * as ApiClient from "./../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import React from "react";

export const SignoutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const mutation = useMutation(ApiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ children: "logged out successfully", type: "success" });
      navigate("/auth/signin");
    },
    onError: (error: Error) => {
      showToast({ children: error.message, type: "error" });
    },
  });

  const onSignoutClick = React.useCallback(() => {
    mutation.mutate();
  }, []);

  return (
    <button
      onClick={onSignoutClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      <span>Sign out</span>
    </button>
  );
};
