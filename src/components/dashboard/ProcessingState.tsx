import { useEffect, useState } from 'react';
import { type ClassificationItem } from '@/pages/ClassifyPage'; 
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

type ProcessingStateProps = {
  items: ClassificationItem[];
};

/**
 * Mostra o progresso geral e o status individual de cada
 * arquivo durante o upload e classificação.
 */
export default function ProcessingState({ items }: ProcessingStateProps) {
  const [processedCount, setProcessedCount] = useState(0);

  // Calcula a porcentagem de progresso
  useEffect(() => {
    const doneCount = items.filter(
      (item) => item.status === 'success' || item.status === 'error'
    ).length;
    setProcessedCount(doneCount);
  }, [items]);

  const progressPercentage =
    items.length > 0 ? (processedCount / items.length) * 100 : 0;

  return (
    <div className="flex h-full flex-col p-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        Classificando Imagens...
      </h2>

      {/* Progresso Geral */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>
            Progresso Geral ({processedCount} / {items.length})
          </span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="w-full" />
      </div>

      {/* Lista de Arquivos */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md bg-gray-100 p-3 dark:bg-gray-700"
          >
            <span className="truncate text-sm text-gray-800 dark:text-gray-200">
              {item.file.name}
            </span>

            {/* Ícone de Status */}
            {item.status === 'processing' && (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            )}
            {item.status === 'success' && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {item.status === 'error' && (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}