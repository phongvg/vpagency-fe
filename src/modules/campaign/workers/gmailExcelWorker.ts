import type { GmailUIDMapping } from "@/modules/campaign/types/campaign.type";
import { removeDash } from "@/shared/utils/common.util";
import * as XLSX from "xlsx";

interface WorkerMessage {
  type: "process";
  file: ArrayBuffer;
}

interface WorkerResponse {
  type: "success" | "error" | "progress" | "debug";
  data?: GmailUIDMapping[];
  error?: string;
  progress?: number;
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type, file } = e.data;

  if (type !== "process") return;

  try {
    self.postMessage({ type: "progress", progress: 10 } as WorkerResponse);

    const fileData = new Uint8Array(file);
    const workbook = XLSX.read(fileData, { type: "array" });

    self.postMessage({ type: "progress", progress: 30 } as WorkerResponse);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    self.postMessage({ type: "progress", progress: 50 } as WorkerResponse);

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    self.postMessage({ type: "progress", progress: 70 } as WorkerResponse);

    const mappedData: GmailUIDMapping[] = (jsonData as any[]).map((row) => ({
      gmail: row["email"]?.toString().trim() || "",
      uid: removeDash(row["cid"]?.toString().trim() || "") || "",
    }));

    self.postMessage({ type: "progress", progress: 100 } as WorkerResponse);
    self.postMessage({ type: "success", data: mappedData } as WorkerResponse);
  } catch (error) {
    self.postMessage({
      type: "error",
      error: error instanceof Error ? error.message : "Lỗi xử lý file",
    } as WorkerResponse);
  }
};
