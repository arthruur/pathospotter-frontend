import Uppy from "@uppy/core";
import Tus from "@uppy/tus";

export function configureUppy(uppy: Uppy) {
  uppy.use(Tus, {
    endpoint: import.meta.env.VITE_TUS_ENDPOINT ?? "http://localhost:8000/upload/",
    chunkSize: 10 * 1024 * 1024, // 10MB
    limit: 5,
    retryDelays: [0, 1000, 3000, 5000],
  });

  return uppy;
}
