import type { CreateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import { useCallback, useRef, useState } from "react";

interface UseImportAppealedProxyExcelReturn {
  processFile: (file: File) => Promise<CreateAppealedProxyRequest[]>;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export const useImportAppealedProxyExcel = (): UseImportAppealedProxyExcelReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const processFile = useCallback((file: File): Promise<CreateAppealedProxyRequest[]> => {
    return new Promise((resolve, reject) => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      const worker = new Worker(new URL("../workers/importAppealedProxyWorker.ts", import.meta.url), {
        type: "module",
      });

      workerRef.current = worker;

      worker.onmessage = (e: MessageEvent) => {
        const { type, data, error: workerError, progress: workerProgress } = e.data;

        if (type === "progress") {
          setProgress(workerProgress || 0);
        } else if (type === "success") {
          setIsProcessing(false);
          setProgress(100);
          worker.terminate();
          workerRef.current = null;
          resolve(data);
        } else if (type === "error") {
          setIsProcessing(false);
          setError(workerError || "Lỗi xử lý file");
          worker.terminate();
          workerRef.current = null;
          reject(new Error(workerError || "Lỗi xử lý file"));
        }
      };

      worker.onerror = (err) => {
        setIsProcessing(false);
        setError("Lỗi khởi tạo worker");
        worker.terminate();
        workerRef.current = null;
        reject(err);
      };

      const reader = new FileReader();
      reader.onload = () => {
        worker.postMessage({ type: "process", file: reader.result });
      };
      reader.onerror = () => {
        setIsProcessing(false);
        setError("Lỗi đọc file");
        worker.terminate();
        workerRef.current = null;
        reject(new Error("Lỗi đọc file"));
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  return { processFile, isProcessing, progress, error };
};
