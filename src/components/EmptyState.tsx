// pathospotter-frontend/src/components/EmptyStat.tsx
import React from 'react';
import { UploadCloud } from 'lucide-react';
import { useHypercellularityUpload } from "../hooks/useHypercellularityUpload";

type EmptyStateProps = {
  // Você vai implementar essa função depois
  // onFileSelect: (file: File) => void;
};

/**
 * Componente para o estado inicial (vazio) do dashboard.
 * Mostra a área de upload de arquivos.
 */
export default function EmptyState({}: EmptyStateProps) {
  const uploadMutation = useHypercellularityUpload();

  const sendFile = (file: File) => {
    uploadMutation.mutate(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selecionado:", file.name);
      sendFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log("Solto:", file.name);
      sendFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

   return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <label
        htmlFor="file-upload"
        className="flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-400 bg-white p-12 transition hover:border-gray-600"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <UploadCloud className="h-16 w-16 text-gray-500" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Arraste e solte a imagem da lâmina aqui
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Formatos suportados: .tiff
        </p>

        <div className="mt-6 flex items-center">
          <span className="h-px flex-1 bg-gray-300" />
          <span className="px-4 text-sm font-medium text-gray-500">OU</span>
          <span className="h-px flex-1 bg-gray-300" />
        </div>

        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={handleFileChange}
          accept=".tiff,.tif,.jpg,.png"
        />

        <button
          type="button"
          className="mt-6 rounded-md bg-[#702331] py-2 px-4 font-semibold text-white shadow-md transition hover:bg-[#5a1c27]"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          Selecione um Arquivo
        </button>
      </label>

      {/* LOADING */}
      {uploadMutation.isLoading && (
        <p className="mt-4 text-gray-700">Enviando arquivo...</p>
      )}

      {/* SUCCESS */}
      {uploadMutation.isSuccess && (
        <pre className="mt-4 text-left bg-gray-100 p-4 rounded-lg shadow">
          {JSON.stringify(uploadMutation.data, null, 2)}
        </pre>
      )}

      {/* ERROR */}
      {uploadMutation.isError && (
        <p className="mt-4 text-red-500">
          Erro ao enviar: {(uploadMutation.error as any)?.message}
        </p>
      )}
    </div>
  );
}
