import { Outlet } from 'react-router-dom';

/**
 * Layout de tela dividida para as páginas de autenticação (Vite).
 * Renderiza o <Outlet> para exibir
 * as páginas filhas definidas no roteador.
 */
export default function AuthLayout() {
  return (
    <main className="flex min-h-screen w-full bg-white dark:bg-gray-900">
      {/* Coluna da Imagem (Esquerda) - Escondida em telas pequenas (lg:flex) */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop')",
          }}
        />
        {/* Overlay para escurecer a imagem e melhorar a legibilidade */}
        <div className="absolute inset-0 bg-[#702331] opacity-50" />
      </div>

      {/* Coluna do Formulário (Direita) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 bg-white">
        <Outlet />
      </div>
    </main>
  );
}

