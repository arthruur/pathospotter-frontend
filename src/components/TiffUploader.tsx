import { useEffect } from "react";
import { Dashboard } from "@uppy/react";
import StatusBar from "@uppy/status-bar";
import { useUppy } from "../uppy/UppyProvider";
import { configureUppy } from "../uppy/setupUppy";

export default function TiffUploader() {
  const uppy = useUppy();

  useEffect(() => {
    configureUppy(uppy);

    uppy.on("upload-success", (file, response) => {
      console.log("✅ Upload finalizado:", file.name);
      console.log("URL do arquivo no servidor:", response.uploadURL);
    });

    return () => {
      uppy.close(); // evita vazamentos de listener
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />
      <StatusBar uppy={uppy} hideAfterFinish={false} />
    </div>
  );
}
