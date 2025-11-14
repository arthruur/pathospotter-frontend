import { createContext, useContext, useState, ReactNode } from "react";
import Uppy from "@uppy/core";

type UppyCtx = { uppy: Uppy };
const UppyContext = createContext<UppyCtx | null>(null);

export function useUppy() {
  const ctx = useContext(UppyContext);
  if (!ctx) throw new Error("useUppy must be inside <UppyProvider>");
  return ctx.uppy;
}

export function UppyProvider({ children }: { children: ReactNode }) {
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        allowedFileTypes: [".tiff", ".tif"],
        maxNumberOfFiles: 5,
      },
      autoProceed: false,
    })
  );

  return (
    <UppyContext.Provider value={{ uppy }}>{children}</UppyContext.Provider>
  );
}
