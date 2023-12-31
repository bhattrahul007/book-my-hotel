type SignupParams = {
  confirmPassword: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type SigninParam = {
  email: string;
  password: string;
};

const API_AUTH_SIGNUP_URL = import.meta.env.VITE_API_AUTH_SIGNUP_URL;
const BACKEND_SERVER_BASEURI = import.meta.env.VITE_BACKEND_SERVER_BASEURI;

export const authSignup = async (params: SignupParams) => {
  const response = await fetch(`${API_AUTH_SIGNUP_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(params),
  });
  const result = await response.json();
  if (response.status !== 200) {
    throw new Error(result.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(
    `${BACKEND_SERVER_BASEURI}/api/auth/tokens/validate`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("invalid token");
  }
  return response.json();
};

export const signin = async (params: SigninParam) => {
  const response = await fetch(`${BACKEND_SERVER_BASEURI}/api/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const logout = async () => {
  const response = await fetch(`${BACKEND_SERVER_BASEURI}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error("error happened during logout.");
  }
  return result;
};
