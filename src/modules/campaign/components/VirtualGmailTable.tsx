import type { GmailUIDMapping } from "@/modules/campaign/types/campaign.type";
import { addDash } from "@/shared/utils/common.util";
import { useCallback, useMemo } from "react";
import { FixedSizeList } from "react-window";

interface VirtualGmailTableProps {
  gmail: GmailUIDMapping[];
}

const HEIGHT = 760;
const ROW_HEIGHT = 80;
const HEADER_HEIGHT = 56;

const columns = [
  { key: "gmail", align: "items-center" },
  { key: "uid", align: "items-center" },
];

const headerColumns = [
  { key: "gmail", label: "Email" },
  { key: "uid", label: "UID" },
];

export default function VirtualGmailTable({ gmail }: VirtualGmailTableProps) {
  const tableHeight = useMemo(() => HEIGHT - HEADER_HEIGHT, []);

  const columnWidths = useMemo(
    () => ({
      stt: 70,
      email: 510,
      uid: 520,
    }),
    []
  );

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const emailItem = gmail[index];

      return (
        <div
          style={{
            ...style,
            display: "grid",
            gridTemplateColumns: `${columnWidths.stt}px ${columnWidths.email}px ${columnWidths.uid}px`,
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
            boxSizing: "border-box",
          }}
          className='bg-white'>
          <div className='flex items-center px-4 border-r'>{index + 1}</div>

          {columns.map((col) => {
            const width = columnWidths[col.key as keyof typeof columnWidths];
            let content: React.ReactNode = emailItem[col.key as keyof GmailUIDMapping];

            // Format UID with dashes
            if (col.key === "uid") {
              content = addDash(emailItem.uid || "");
            }

            return (
              <div key={col.key} className={`flex px-4 border-r whitespace-nowrap ${col.align}`}>
                {content}
              </div>
            );
          })}
        </div>
      );
    },
    [gmail, columnWidths]
  );

  return (
    <div className='relative border border-gray-200 rounded-lg overflow-hidden'>
      <div style={{ width: "100%", height: HEIGHT, overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ minWidth: totalWidth }}>
          <div style={{ height: HEADER_HEIGHT }} className='bg-white border-gray-200 border-b'>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ width: columnWidths.stt, minWidth: columnWidths.stt }} className='flex items-center px-4 border-r font-semibold'>
                STT
              </div>

              {headerColumns.map((col) => {
                const width = columnWidths[col.key as keyof typeof columnWidths];

                return (
                  <div key={col.key} style={{ width, minWidth: width }} className='flex items-center px-4 border-r font-semibold'>
                    {col.label}
                  </div>
                );
              })}
            </div>
          </div>

          <FixedSizeList height={tableHeight} itemCount={gmail.length} itemSize={ROW_HEIGHT} width={totalWidth} style={{ overflowX: "hidden" }}>
            {Row}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
}
