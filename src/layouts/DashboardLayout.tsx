import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, UserCircle, FileText, BarChart2 } from 'lucide-react';

/**
 * Layout principal para a área logada da aplicação.
 * Inclui um cabeçalho fixo, uma sidebar de navegação
 * e renderiza as páginas filhas através do <Outlet />.
 */
export default function DashboardLayout() {
  const location = useLocation(); 

  // Links da Sidebar
  const navLinks = [
    { name: 'Fazer Análise', href: '/', icon: FileText },
    { name: 'Análises Feitas', href: '/history', icon: BarChart2 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Cabeçalho Fixo */}
      <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-md sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/">
          <img
            src="/LogoPathoSpotter.png"
            alt="Logo PathoSpotter"
            className="h-12 w-auto"
          />
        </Link>

        {/* Menu do Usuário (Placeholder) */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full text-gray-500 hover:text-[#702331] dark:text-gray-400 dark:hover:text-rose-300"
          >
            <UserCircle className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-gray-500 hover:text-[#702331] dark:text-gray-400 dark:hover:text-rose-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden text-sm sm:block">Sair</span>
          </button>
        </div>
      </header>

      {/* Container Principal (Sidebar + Conteúdo) */}
      <div className="flex flex-1 h-full">
        {/* Sidebar Fixa (Apenas Ícones) */}
        <aside className="hidden w-20 flex-col items-center bg-white p-4 shadow-lg md:flex">
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.name} className="relative group">
                    <Link
                      to={link.href}
                      className={`
                        flex items-center justify-center rounded-md p-3 text-sm font-medium
                        transition-colors
                        ${
                          isActive
                            ? 'bg-[#702331] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <link.icon className="h-5 w-5" />
                    </Link>
                    <span
                      className="
                        pointer-events-none absolute left-full top-1/2 z-10 ml-4
                        -translate-y-1/2 whitespace-nowrap rounded-md
                        bg-[#702331] px-3 py-1.5 text-sm font-medium
                        text-white opacity-0 shadow-lg transition-opacity
                        group-hover:opacity-100
                      "
                    >
                      {link.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

