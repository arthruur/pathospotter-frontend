PathoSpotter - Interface Web

Este repositório contém o código-fonte do front-end da plataforma PathoSpotter, uma aplicação web (SaaS) projetada para patologistas e pesquisadores médicos. A plataforma utiliza IA para analisar imagens de biópsias renais, e esta interface é construída com React, Vite e TypeScript para oferecer uma experiência de usuário rápida, responsiva e moderna.

Tecnologias Utilizadas

O projeto é construído como uma Single-Page Application (SPA) utilizando as seguintes tecnologias:

Biblioteca Principal: React

Ambiente de Build: Vite

Linguagem: TypeScript

Estilização: Tailwind CSS

Roteamento: React Router v6

Componentes de UI: shadcn/ui

Ícones: Lucide React

Gestor de Pacotes: pnpm

Como Iniciar

Siga os passos abaixo para configurar e executar o projeto localmente.

Pré-requisitos

Node.js (v18 ou superior)

pnpm (instalado globalmente: npm install -g pnpm)

Instalação

Clone o repositório:

git clone [https://github.com/seu-usuario/pathospotter-vite.git](https://github.com/seu-usuario/pathospotter-vite.git)


Navegue até o diretório do projeto:

cd pathospotter-vite


Instale as dependências:

pnpm install


Executando o Projeto

Para iniciar o servidor de desenvolvimento (com Hot Reload):

pnpm dev


Abra http://localhost:5173 (ou a porta indicada no terminal) no seu navegador para ver a aplicação.

Estrutura do Projeto

A arquitetura do projeto é organizada para separar responsabilidades, facilitando a manutenção e a escalabilidade.

pathospotter-vite/
├── public/               # Arquivos estáticos (logo.png, favicon, etc.)
│
├── src/
│   ├── assets/           # Imagens, fontes e outros recursos importados (ex: via JS/CSS)
│   │
│   ├── components/
│   │   ├── ui/           # Componentes "primitivos" do shadcn/ui (Button, Tooltip, etc.)
│   │   └── dashboard/    # Componentes específicos do dashboard (EmptyState, etc.)
│   │
│   ├── hooks/            # Hooks customizados do React (ex: useAnalysisState)
│   │
│   ├── layouts/          # Define a estrutura visual das páginas
│   │   ├── AuthLayout.tsx        # Layout de tela dividida (imagem + formulário) para /login
│   │   └── DashboardLayout.tsx   # Layout principal (Header + Sidebar) para a área logada
│   │
│   ├── lib/
│   │   └── utils.ts      # Função utilitária `cn` do shadcn/ui
│   │
│   ├── pages/            # Componentes que representam uma rota completa (uma "página")
│   │   ├── LoginPage.tsx
│   │   ├── RecoverPasswordPage.tsx
│   │   └── DashboardPage.tsx
│   │
│   ├── router/
│   │   └── index.tsx     # Ponto central de configuração de rotas (react-router-dom)
│   │
│   ├── App.tsx           # Componente raiz (atualmente substituído pelo router)
│   ├── main.tsx          # Ponto de entrada da aplicação (renderiza o React e o Router)
│   └── index.css         # Arquivo de CSS global (onde o Tailwind é importado)
│
├── index.html            # O template HTML único da SPA
├── package.json          # Dependências e scripts do projeto
├── tailwind.config.ts    # Configuração do Tailwind CSS
├── tsconfig.json         # Configuração do TypeScript
└── vite.config.ts        # Configuração do Vite (ex: aliases de caminho)


Filosofia de Roteamento

O roteamento é centralizado no arquivo src/router/index.tsx. Ele utiliza react-router-dom para definir "layouts aninhados":

Rotas de Autenticação (/login, /recover-password): São renderizadas dentro do AuthLayout, que exibe a tela dividida de imagem e formulário.

Rotas do Dashboard (/, /history): São renderizadas dentro do DashboardLayout, que exibe o cabeçalho principal e a sidebar de navegação.

O componente <Outlet /> dentro de cada arquivo de layout é o marcador de posição onde as páginas filhas (LoginPage, DashboardPage, etc.) serão renderizadas.

Componentes com shadcn/ui

Este projeto utiliza shadcn/ui, que não é uma biblioteca de componentes tradicional. Em vez de instalar um pacote, você usa a CLI para copiar o código-fonte dos componentes para o seu projeto.

Para adicionar um novo componente (ex: Button):

pnpm dlx shadcn-ui@latest add button


Isso copiará o arquivo button.tsx para src/components/ui/. A vantagem é ter controlo total sobre o código, estilos e comportamento de cada componente.