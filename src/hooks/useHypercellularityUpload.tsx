// src/hooks/useHypercellularityUpload.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8080/classifier/hypercellularity";

export function useHypercellularityUpload() {

  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("files", file); // mesmo nome do Postman/body

      const response = await axios.post(API_URL, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
  });
}
