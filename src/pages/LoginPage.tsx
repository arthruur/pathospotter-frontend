import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Mail, Lock, EyeOff,
  Eye, X, Loader2
} from 'lucide-react';
import { useState, type FormEvent } from "react";


export default function LoginPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {};
    if (!username) errors.username = "Usuário é obrigatório";
    if (!password) errors.password = "Senha é obrigatória";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  };

  const handleLog = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const user = await handleLogin({ username, password });
      console.log("Login successful, user:", user);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setFormErrors({
        general: "Credenciais inválidas. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isSubmitting;

  return (
    <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
      {/* Cabeçalho do formulário */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/LogoPathoSpotter.png"
          alt="Logo PathoSpotter"
          width={300}
          height={50}
        />
      </div>

      {/* Formulário */}
      <form className="space-y-6" onSubmit={handleLog}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#702331]"
          >
            Username
          </label>
          {/* 2. Container relativo para posicionar o ícone */}
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-[#702331]" aria-hidden="true" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (formErrors.username) {
                  setFormErrors({ ...formErrors, username: "" });
                }
              }}
              placeholder="Digite seu usuário"
              disabled={isFormDisabled}
              className="block w-full rounded-md border-[#702331] text-[#702331] p-3 pl-10 shadow-sm focus:border-[#702331] focus:ring-[#702331]" autoComplete="username"
            />


          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#702331]"
          >
            Senha
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-[#702331]" aria-hidden="true" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formErrors.password) {
                  setFormErrors({ ...formErrors, password: "" });
                }
              }}
              placeholder="********"
              disabled={isFormDisabled}
              className="block w-full rounded-md border-gray-300 text-[#702331] bg-gray-50 p-3 pl-10 shadow-sm focus:border-[#702331] focus:ring-[#702331]"
              autoComplete="current-password"
            />
            {password && (
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 text-red-900">
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="#6e1f30 rounded-full p-1 transition hover:bg-red-100 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                  disabled={isFormDisabled}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setPassword("")}
                  className="rounded-full p-1 transition hover:bg-red-100 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                  disabled={isFormDisabled}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cor do botão e dos estados (focus, hover)*/}
        <button
          type="submit"
          className="w-full rounded-md bg-[#702331] py-3 px-4 text-white shadow-md transition hover:bg-[#5a1c27] focus:outline-none focus:ring-2 focus:ring-[#702331] focus:ring-offset-2"
        >
          {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

