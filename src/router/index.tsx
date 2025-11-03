import { createBrowserRouter } from 'react-router-dom';

// Importações do fluxo de Autenticação
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';

// --- Novas Importações do Dashboard ---
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';

/**
 * Define as rotas da aplicação.
 */
export const router = createBrowserRouter([
  {
    // Rotas de Autenticação (públicas)
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true, 
        element: <DashboardPage />,
      },
    ],
  },
]);

