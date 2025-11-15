import { type ClassificationItem } from '../../pages/ClassifyPage';
import { Button } from '../../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

type ClassificationResultsProps = {
  items: ClassificationItem[];
  onNew: () => void;
};

/**
 * Exibe a tabela de resultados da classificação.
 */
export default function ClassificationResults({
  items,
  onNew,
}: ClassificationResultsProps) {
  const successCount = items.filter(
    (item) => item.status === 'success'
  ).length;
  const errorCount = items.filter((item) => item.status === 'error').length;

  // Função para extrair a predição principal
  // ATENÇÃO: Ajuste isso com base na resposta REAL da sua API
  const getTopPrediction = (result: any) => {
    if (!result || !result.predictions) return { class: 'N/A', prob: 0 };
    // Exemplo: { "predictions": { "Sclerosis": 0.9, "Normal": 0.1 } }
    const topClass = Object.keys(result.predictions).reduce((a, b) =>
      result.predictions[a] > result.predictions[b] ? a : b
    );
    const topProb = result.predictions[topClass];
    return {
      class: topClass,
      prob: (topProb * 100).toFixed(1), // Converte para porcentagem
    };
  };

  return (
    <div className="flex h-full flex-col p-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        Resultados da Classificação
      </h2>

      {/* Sumário */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>
            {successCount} {successCount === 1 ? 'imagem' : 'imagens'} classificada(s)
          </span>
        </div>
        {errorCount > 0 && (
          <div className="flex items-center gap-2 text-lg text-red-500">
            <XCircle className="h-5 w-5" />
            <span>
              {errorCount} {errorCount === 1 ? 'falha' : 'falhas'} na classificação
            </span>
          </div>
        )}
      </div>

      {/* Tabela de Resultados */}
      <div className="flex-1 overflow-y-auto rounded-lg border dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arquivo</TableHead>
              <TableHead>Classificação</TableHead>
              <TableHead>Confiança</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const prediction =
                item.status === 'success'
                  ? getTopPrediction(item.result)
                  : null;
              return (
                <TableRow key={index} className="dark:border-gray-700">
                  <TableCell className="max-w-[150px] truncate font-medium dark:text-gray-200">
                    {item.file.name}
                  </TableCell>
                  <TableCell
                    className={
                      item.status === 'error' ? 'text-red-500' : 'dark:text-gray-300'
                    }
                  >
                    {item.status === 'success' ? (
                      prediction?.class
                    ) : (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" /> Falha
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    className={
                      item.status === 'error' ? 'text-red-500' : 'dark:text-gray-300'
                    }
                  >
                    {item.status === 'success' ? `${prediction?.prob}%` : 'N/A'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Botão de Ação */}
      <div className="mt-6">
        <Button
          type="button"
          onClick={onNew}
          className="w-full bg-[#702331] py-3 text-lg font-semibold text-white hover:bg-[#5a1c27]"
        >
          Classificar Novas Imagens
        </Button>
      </div>
    </div>
  );
}