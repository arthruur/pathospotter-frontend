import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {

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
      <form className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#702331]"
          >
            E-mail
          </label>
          {/* 2. Container relativo para posicionar o ícone */}
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-[#702331]" aria-hidden="true" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              // 3. Adicionado padding à esquerda (pl-10) para dar espaço ao ícone
              className="block w-full rounded-md border-[#702331] text-[#702331] p-3 pl-10 shadow-sm focus:border-[#702331] focus:ring-[#702331]"
              placeholder="seu@email.com"
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
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-gray-300 text-[#702331] bg-gray-50 p-3 pl-10 shadow-sm focus:border-[#702331] focus:ring-[#702331]"
              placeholder="********"
            />
          </div>
        </div>

        {/* Cor do botão e dos estados (focus, hover)*/}
        <button
          type="submit"
          className="w-full rounded-md bg-[#702331] py-3 px-4 text-white shadow-md transition hover:bg-[#5a1c27] focus:outline-none focus:ring-2 focus:ring-[#702331] focus:ring-offset-2"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

