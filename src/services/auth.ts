// src/services/auth.ts
import api from "./api";

type LoginArgs = { username: string, password: string };

export const login = async ({ username, password }: LoginArgs) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  return await api.post("/authentication/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const logout = async () => {
  try {
    // revoke on the backend
    await api.post("/authentication/logout");
  } catch (err) {
    console.warn("Backend logout failed, ignoring:", err);
  } finally {
    // always clear token locally
    localStorage.removeItem("token");
  }
};