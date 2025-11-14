// src/services/api.ts
import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Separate function for file upload
export const uploadFile = async (file: File) => {
  try {
    const form = new FormData();
    form.append("files", file);

    const { data } = await api.post("/classifier/hypercellularity", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: unknown) {
    const err = error as AxiosError<any>;
    throw new Error(err.response?.data?.message || "Failed to upload file");
  }
};


export const downloadPDF = async (pdfUrl: string, filename: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  try {
    const response = await api.get(pdfUrl, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Cria URL temporária para baixar
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error: unknown) {
    const err = error as AxiosError<any>;
    throw new Error(err.response?.data?.message || "Failed to upload file");
  }
};

export default api;