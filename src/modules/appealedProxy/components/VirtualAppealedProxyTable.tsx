import type { CreateAppealedProxyRequest } from "@/modules/appealedProxy/types/appealedProxy.type";
import { useCallback, useMemo } from "react";
import { FixedSizeList } from "react-window";

interface VirtualAppealedProxyTableProps {
  proxies: CreateAppealedProxyRequest[];
}

const HEIGHT = 500;
const ROW_HEIGHT = 56;
const HEADER_HEIGHT = 48;

const columns = [
  { key: "ip", align: "items-center" },
  { key: "protocol", align: "items-center" },
  { key: "country", align: "items-center" },
  { key: "source", align: "items-center" },
  { key: "user", align: "items-center" },
  { key: "purchasedAt", align: "items-center" },
];

const headerColumns = [
  { key: "ip", label: "IP" },
  { key: "protocol", label: "Giao thức" },
  { key: "country", label: "Quốc gia" },
  { key: "source", label: "Nguồn" },
  { key: "user", label: "Người dùng" },
  { key: "purchasedAt", label: "Ngày mua" },
];

export default function VirtualAppealedProxyTable({ proxies }: VirtualAppealedProxyTableProps) {
  const tableHeight = useMemo(() => HEIGHT - HEADER_HEIGHT, []);

  const columnWidths = useMemo(
    () => ({
      stt: 60,
      ip: 300,
      protocol: 150,
      country: 150,
      source: 200,
      user: 200,
      purchasedAt: 150,
    }),
    []
  );

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const proxy = proxies[index];

      return (
        <div
          className='border border-b-slate-500'
          style={{
            ...style,
            display: "flex",
            boxSizing: "border-box",
          }}>
          <div style={{ width: columnWidths.stt, minWidth: columnWidths.stt }} className='flex justify-center items-center px-4 border-r'>
            <span>{index + 1}</span>
          </div>

          {columns.map((col, i) => {
            const width = columnWidths[col.key as keyof typeof columnWidths];

            return (
              <div key={col.key} style={{ width, minWidth: width }} className={`px-4 ${col.align} ${i !== columns.length - 1 ? "border-r" : ""}`}>
                <span className='break-words'>{String(proxy[col.key as keyof CreateAppealedProxyRequest] ?? "")}</span>
              </div>
            );
          })}
        </div>
      );
    },
    [proxies, columnWidths]
  );

  return (
    <div className='relative overflow-hidden'>
      <div style={{ width: "100%", height: HEIGHT, overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ minWidth: totalWidth }}>
          <div style={{ height: HEADER_HEIGHT }} className='border border-b-slate-500'>
            <div style={{ display: "flex", height: "100%" }}>
              <div
                style={{ width: columnWidths.stt, minWidth: columnWidths.stt }}
                className='flex justify-center items-center px-4 border-r font-semibold'>
                STT
              </div>

              {headerColumns.map((col, i) => {
                const width = columnWidths[col.key as keyof typeof columnWidths];

                return (
                  <div
                    key={col.key}
                    style={{ width, minWidth: width }}
                    className={`flex items-center px-4 font-semibold ${i !== headerColumns.length - 1 ? "border-r" : ""}`}>
                    {col.label}
                  </div>
                );
              })}
            </div>
          </div>

          <FixedSizeList height={tableHeight} itemCount={proxies.length} itemSize={ROW_HEIGHT} width={totalWidth} style={{ overflowX: "hidden" }}>
            {Row}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
}
