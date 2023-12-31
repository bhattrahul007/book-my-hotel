import * as ApiClient from "./../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

type RegisterFormParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormParams>();

  const mutation = useMutation(ApiClient.authSignup, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ children: "Account created", type: "success" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ children: error.message, type: "error" });
    },
  });

  const onSignupSubmit = useCallback(
    handleSubmit((data) => {
      mutation.mutate(data);
    }),
    []
  );

  return (
    <form
      method="POST"
      onSubmit={onSignupSubmit}
      className="flex flex-col gap-5"
    >
      <h2 className="text-3xl font-bold">Create an account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label
          htmlFor="first_name_id"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          First name
          <input
            id="first_name_id"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required." })}
            type="text"
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label
          htmlFor="last_name_id"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Last name
          <input
            id="last_name_id"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required." })}
            type="text"
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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

        <label
          htmlFor="confirm_password_id"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Confirm Password
          <input
            autoComplete="new-password"
            id="confirm_password_id"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) {
                  return "This field is required.";
                } else if (watch("password") !== value) {
                  return "Password do not match.";
                }
              },
            })}
            type="password"
          ></input>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create an account
        </button>
        <div>
          <span className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-600" to="/auth/signin">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
};
