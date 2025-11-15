import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, UserCircle, FileText, BarChart2, Boxes } from 'lucide-react';

/**
 * Layout principal para a área logada da aplicação.
 * Consiste em uma Sidebar fixa (com Logo, Ícones e Texto) e o conteúdo principal.
 */
export default function DashboardLayout() {
  const location = useLocation();

  // Links da Sidebar
  const navLinks = [
    { name: 'Análises Feitas', href: '/history', icon: BarChart2 },
    { name: 'Fazer Análise', href: '/', icon: FileText },
    { name: 'Classificar Glomérulos', href: '/classify', icon: Boxes },
  ];

  return (
    // Container principal agora é um flex-row na altura total da tela
    <div className="flex h-screen bg-gray-100 dark:bg-gray-100">
      {/* Sidebar Fixa (Acomoda Logo, Nav e Ações) */}
      <aside className="hidden w-64 flex-col bg-white p-4 shadow-lg md:flex">
        {/* 1. Logo (Sem Tooltip) */}
        <div className="mb-6">
          <Link to="/">
            <img
              src="/LogoPathoSpotter.png"
              alt="Logo PathoSpotter"
              className="h-8 w-auto mt-6 mx-auto" // Centralizado
            />
          </Link>
        </div>

        {/* 2. Navegação Principal (flex-1 para empurrar ações para baixo) */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`
                      flex items-center gap-3 rounded-md p-3 text-sm font-medium
                      transition-colors
                      ${
                        isActive
                          ? 'bg-[#702331] text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-300'
                      }
                    `}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 3. Menu de Ação (Com texto, na base da sidebar) */}
        <div className="mt-auto flex flex-col items-stretch space-y-2">
          {/* Botão de Usuário */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-300"
          >
            <UserCircle className="h-6 w-6" />
            <span>Meu Perfil</span>
          </button>

          {/* Botão de Sair */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-md p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-300"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal (Ocupa o restante do espaço) */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}