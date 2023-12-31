import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as ApiClient from "./../api-client";
import { useCallback } from "react";

export type SigninFormParam = {
  email: string;
  password: string;
};

export const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormParam>();

  const mutation = useMutation(ApiClient.signin, {
    onSuccess: async () => {
      console.log("user logged in.");
    },
    onError: async (error: Error) => {
      console.error("login error: ", error);
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
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Log in
          </button>
        </div>
      </form>
    </>
  );
};
