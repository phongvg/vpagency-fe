import type { CreateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import * as XLSX from "xlsx";

interface WorkerMessage {
  type: "process";
  file: ArrayBuffer;
}

interface WorkerResponse {
  type: "success" | "error" | "progress";
  data?: CreateAppealedProxyRequest[];
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
    if (!sheetName) {
      throw new Error("File Excel không có sheet nào");
    }

    const sheet = workbook.Sheets[sheetName];
    const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    self.postMessage({ type: "progress", progress: 50 } as WorkerResponse);

    if (rows.length === 0) {
      throw new Error("File Excel không có dữ liệu");
    }

    const proxies: CreateAppealedProxyRequest[] = rows.map((row, index) => {
      if (index % 100 === 0) {
        const progress = 50 + Math.floor((index / rows.length) * 45);
        self.postMessage({ type: "progress", progress } as WorkerResponse);
      }

      const ip = row["ip"] || row["IP"] || null;
      const protocol = row["protocol"] || row["giao thức"] || null;
      const country = row["country"] || row["quốc gia"] || null;
      const source = row["source"] || row["nguồn"] || null;
      const user = row["user"] || row["người dùng"] || null;
      const rawPurchasedAt = row["purchasedAt"] || row["ngày mua"] || null;
      let purchasedAt: string | null = null;
      if (typeof rawPurchasedAt === "number") {
        const date = new Date((rawPurchasedAt - 25569) * 86400000);
        purchasedAt = [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, "0"), String(date.getUTCDate()).padStart(2, "0")].join("-");
      } else if (rawPurchasedAt) {
        purchasedAt = rawPurchasedAt;
      }

      return {
        ip,
        protocol: protocol || undefined,
        country: country || undefined,
        source: source || undefined,
        user: user || undefined,
        purchasedAt: purchasedAt || undefined,
      };
    });

    self.postMessage({ type: "progress", progress: 100 } as WorkerResponse);

    self.postMessage({ type: "success", data: proxies } as WorkerResponse);
  } catch (error) {
    self.postMessage({
      type: "error",
      error: error instanceof Error ? error.message : "Lỗi xử lý file",
    } as WorkerResponse);
  }
};
