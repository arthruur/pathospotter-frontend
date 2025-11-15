import React, { useState } from 'react';
import ClassifyEmptyState from '../components/dashboard/ClassifyEmptyState';
// 1. Importar os novos componentes de estado
import ProcessingState from '../components/dashboard/ProcessingState';
import ClassificationResults from '../components/dashboard/ClassificationResults';

// Define os possíveis estados da página
type ClassifyPageState = 'empty' | 'processing' | 'results';

// Define a estrutura para cada item de classificação
export type ClassificationItem = {
  file: File;
  status: 'pending' | 'processing' | 'success' | 'error';
  result?: any; // Armazena a resposta da API em caso de sucesso
  error?: string; // Armazena a mensagem de erro
};

/**
 * Página para o fluxo de "Apenas Classificação".
 * Gerencia o upload de múltiplos arquivos e chamadas de API em paralelo.
 */
export default function ClassifyPage() {
  const [classifyState, setClassifyState] =
    useState<ClassifyPageState>('empty');

  // Armazena a lista de arquivos com seu status e resultados
  const [items, setItems] = useState<ClassificationItem[]>([]);

  /**
   * Função chamada por `ClassifyEmptyState` quando os arquivos são selecionados.
   * Inicia o processo de upload e classificação.
   */
  const handleFilesSelect = async (files: FileList) => {
    const fileArray = Array.from(files);
    console.log('Iniciando classificação de', fileArray.length, 'arquivos');

    // 1. Mudar para o estado de processamento
    setClassifyState('processing');

    // 2. Inicializar o estado dos itens
    const initialItems: ClassificationItem[] = fileArray.map((file) => ({
      file,
      status: 'processing', // Começa como 'processing'
    }));
    setItems(initialItems);

    // 3. Processar cada arquivo em paralelo
    const classificationPromises = fileArray.map((file) =>
      processFile(file)
    );

    // Promise.allSettled espera todas as promises terminarem, mesmo que algumas falhem
    const results = await Promise.allSettled(classificationPromises);

    // 4. Atualizar o estado 'items' com os resultados finais
    const finalItems = initialItems.map((item, index) => {
      const result = results[index];
      if (result.status === 'fulfilled') {
        return { ...item, status: 'success', result: result.value };
      } else {
        return {
          ...item,
          status: 'error',
          error: result.reason?.message || 'Falha na classificação',
        };
      }
    });

    setClassifyState('results'); // 5. Mudar para o estado de resultados
  };

  /**
   * Processa um único arquivo, enviando-o para a API.
   */
  const processFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file); // A API espera um campo 'file'

    // Use a URL completa da sua API de backend
    // Estou usando um proxy /api/ local que aponta para o seu backend
    const API_URL = '/api/tools/classifier/predict_all';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        // Adicione headers de autenticação (ex: Bearer token) se necessário
        // headers: {
        //   'Authorization': `Bearer ${your_auth_token}`
        // }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro na API (HTTP ${response.status}): ${errorText}`
        );
      }

      const data = await response.json();
      console.log('API Result for', file.name, data);
      return data; // Retorna os dados da predição
    } catch (error: any) {
      console.error('Falha ao processar arquivo', file.name, error);
      throw new Error(error.message || 'Erro desconhecido');
    }
  };

  // Função para reiniciar a análise
  const handleNewClassification = () => {
    setClassifyState('empty');
    setItems([]);
  };

  // Renderiza o painel de controle (lado esquerdo)
  const renderControlPanel = () => {
    switch (classifyState) {
      case 'empty':
        return <ClassifyEmptyState onFilesSelect={handleFilesSelect} />;
      case 'processing':
        // Passa os itens para o componente de processamento
        return <ProcessingState items={items} />;
      case 'results':
        // Passa os itens para o componente de resultados
        return (
          <ClassificationResults
            items={items}
            onNew={handleNewClassification}
          />
        );
      default:
        return <ClassifyEmptyState onFilesSelect={handleFilesSelect} />;
    }
  };

  // Renderiza o visualizador (lado direito)
  const renderViewer = () => {
    switch (classifyState) {
      case 'empty':
        return (
          <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-800">
            <p className="text-gray-500">
              Pronto para classificar glomérulos.
            </p>
          </div>
        );
      case 'processing':
        return (
          <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-800">
            <p className="text-lg font-semibold">Classificando...</p>
          </div>
        );
      case 'results':
        // No futuro, este será um visualizador de galeria interativo
        return (
          <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-4 text-white">
            <p>Galeria de Resultados das Imagens</p>
            <p className="text-sm text-gray-400">
              (Aqui você pode construir um visualizador
              que, ao clicar, mostra a imagem e o resultado)
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-3">
      {/* Coluna Esquerda: Painel de Controle */}
      <div className="col-span-1 h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800">
        {renderControlPanel()}
      </div>

      {/* Coluna Direita: Visualizador */}
      <div className="col-span-1 h-full lg:col-span-2">
        {renderViewer()}
      </div>
    </div>
  );
}