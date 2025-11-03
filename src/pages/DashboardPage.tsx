import { useState } from 'react';
import EmptyState from '../components/EmptyState';
// import ProcessingState from '../components/dashboard/ProcessingState';
// import ResultsState from '../components/dashboard/ResultsState';

// Define os possíveis estados da aplicação
type AnalysisState = 'empty' | 'processing' | 'results';

/**
 * Página principal do dashboard.
 * Gerencia o estado da análise (vazio, processando, resultados)
 * e exibe o layout de duas colunas.
 */

export default function DashboardPage() {
  const [analysisState, setAnalysisState] =
    useState<AnalysisState>('empty');

  const [results, setResults] = useState(null);

  const handleFileSelect = (file: File) => {
    console.log('Iniciando análise do arquivo:', file.name);
    setAnalysisState('processing');

  };

  // Função para reiniciar a análise
  const handleNewAnalysis = () => {
    setAnalysisState('empty');
    setResults(null);
  };

  // Renderiza o componente correto para o painel de controle
  const renderControlPanel = () => {
    switch (analysisState) {
      case 'empty':
        // @ts-ignore (ignora a prop onFileSelect por enquanto)
        return <EmptyState onFileSelect={handleFileSelect} />;
      case 'processing':
        // return <ProcessingState />; (Você criará este componente)
        return (
          <div className="flex h-full items-center justify-center">
            Processando...
          </div>
        );
      case 'results':
        // return <ResultsState results={results} onNewAnalysis={handleNewAnalysis} />; (Você criará este)
        return (
          <div className="p-4">
            <h3 className="text-lg font-bold">Resultados</h3>
            <p>Total de Glomérulos: 18</p>
            <button
              onClick={handleNewAnalysis}
              className="mt-4 rounded bg-blue-500 py-2 px-4 text-white"
            >
              Iniciar Nova Análise
            </button>
          </div>
        );
      default:
        // @ts-ignore (ignora a prop onFileSelect por enquanto)
        return <EmptyState onFileSelect={handleFileSelect} />;
    }
  };

  // Renderiza o componente correto para o visualizador
  const renderViewer = () => {
    switch (analysisState) {
      case 'empty':
        return (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <p className="text-gray-500">Pronto para iniciar a análise.</p>
          </div>
        );
      case 'processing':
        return (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <p className="text-lg font-semibold">Processando imagem...</p>
            {/* Você pode adicionar um spinner aqui */}
          </div>
        );
      case 'results':
        return (
          <div className="flex h-full items-center justify-center bg-gray-900 text-white">
            <p>Visualizador da Imagem com Anotações</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] w-full grid-cols-1 lg:grid-cols-3">
      {/* Coluna Esquerda: Painel de Controle */}
      <div className="col-span-1 h-full overflow-y-auto bg-white shadow-lg">
        {renderControlPanel()}
      </div>

      {/* Coluna Direita: Visualizador */}
      <div className="col-span-1 h-full lg:col-span-2">
        {renderViewer()}
      </div>
    </div>
  );
}
