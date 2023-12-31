import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as ApiClient from "./../api-client";
import { useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SigninFormParam = {
  email: string;
  password: string;
};

export const SigninPage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormParam>();

  const mutation = useMutation(ApiClient.signin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ children: "Sign in successfull.", type: "success" });
      navigate("/");
    },
    onError: async (error: Error) => {
      showToast({ children: error.message, type: "error" });
    },
  });

  const onSigninSubmit = useCallback(
    handleSubmit((data) => {
      mutation.mutate(data);
    }),
    []
  );

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSigninSubmit}>
        <h2 className="text-3xl font-bold">Sign in</h2>
        <div className="flex">
          <label
            htmlFor="email_id"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Email address
            <input
              id="email_id"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("email", { required: "This field is required." })}
              type="email"
            ></input>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <label
            htmlFor="password_id"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Password
            <input
              autoComplete="new-password"
              id="password_id"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("password", {
                required: "This field is required.",
                minLength: {
                  value: 6,
                  message:
                    "Enter a strong password. It must be at least 6 characters long.",
                },
              })}
              type="password"
            ></input>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
        </div>
        <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Log in
          </button>
          <div>
            <span className="text-sm">
              Don't have an account?{" "}
              <Link className="text-blue-600" to="/auth/signup">
                Create an account
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};
