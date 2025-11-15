// src/pages/VisitacaoEscolar/components/AuthProvider.tsx  ⟵ (rename .jsx → .tsx)
import { createContext, useContext, useState, useEffect } from "react";
import { login } from "../services/auth";
import api from "../services/api";
import { useQueryClient } from "@tanstack/react-query";
import type { User, AuthContextType, LoginArgs } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // ✅ sem password
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    api
      .get("/api/v1/users/me")
      .then((resp) => {
        const { data } = resp;
        setAuthToken(`Bearer ${token}`);
        setCurrentUser(data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin({ username, password }: LoginArgs) {
    setLoading(true);
    try {
      const response = await login({ username, password });
      const { user, access_token, token_type } = response.data as any;
      if (!access_token) throw new Error("No access token received");

      localStorage.setItem("token", access_token);
      const bearer = `${token_type} ${access_token}`;
      api.defaults.headers.common.Authorization = bearer;

      setAuthToken(bearer);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      setAuthToken(null);
      setCurrentUser(null);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  // Tornar async quando implementar logout no backend
  function handleLogout() {
    // (opcional) tente revogar no backend se você tiver rota:
    // await api.post("/api/v1/logout").catch(() => {});

    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    setAuthToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);

    // Zera cache para remover dados de usuário/listas protegidas
    queryClient.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        isAuthenticated,
        loading,
        handleLogin,
        handleLogout,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
