import type { UpdateGmailRequest } from "@/modules/gmail/types/gmail.type";
import { useCallback, useMemo } from "react";
import { FixedSizeList } from "react-window";

interface VirtualGmailTableProps {
  gmails: UpdateGmailRequest[];
}

const HEIGHT = 760;
const ROW_HEIGHT = 80;
const HEADER_HEIGHT = 56;

const columns = [
  { key: "profileName", align: "items-center" },
  { key: "name", align: "items-center" },
  { key: "password", align: "items-center" },
  { key: "recoverMail", align: "items-center" },
  { key: "phone", align: "items-center" },
  { key: "code2fa", align: "items-center" },
  { key: "appPassword", align: "items-center" },
  { key: "createdYear", align: "justify-center items-center" },
  { key: "proxy", align: "items-center" },
  { key: "price", align: "items-center" },
];

const headerColumns = [
  { key: "profileName", label: "Tên hồ sơ" },
  { key: "name", label: "Email" },
  { key: "password", label: "Mật khẩu" },
  { key: "recoverMail", label: "Email khôi phục" },
  { key: "phone", label: "Số điện thoại" },
  { key: "code2fa", label: "Mã 2FA" },
  { key: "appPassword", label: "Mật khẩu ứng dụng" },
  { key: "createdYear", label: "Năm tạo" },
  { key: "proxy", label: "Proxy" },
  { key: "price", label: "Tiền" },
];

export default function VirtualGmailTable({ gmails }: VirtualGmailTableProps) {
  const tableHeight = useMemo(() => HEIGHT - HEADER_HEIGHT, []);

  const columnWidths = useMemo(
    () => ({
      stt: 60,
      profileName: 200,
      name: 350,
      password: 250,
      recoverMail: 350,
      phone: 200,
      code2fa: 200,
      appPassword: 200,
      createdYear: 120,
      proxy: 200,
      price: 120,
    }),
    []
  );

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const account = gmails[index];

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

          {columns.map((col, colIndex) => {
            const width = columnWidths[col.key as keyof typeof columnWidths];
            let content = account[col.key as keyof UpdateGmailRequest];

            // Format price field
            if (col.key === "price" && typeof content === "number") {
              content = `$${content.toFixed(2)}` as any;
            }

            return (
              <div
                key={col.key}
                style={{ width, minWidth: width }}
                className={`flex px-4 ${col.align} ${colIndex !== columns.length - 1 ? "border-r" : ""}`}>
                <span>{content}</span>
              </div>
            );
          })}
        </div>
      );
    },
    [gmails, columnWidths]
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

              {headerColumns.map((col, colIndex) => {
                const width = columnWidths[col.key as keyof typeof columnWidths];

                return (
                  <div
                    key={col.key}
                    style={{ width, minWidth: width }}
                    className={`flex items-center px-4 font-semibold ${colIndex !== headerColumns.length - 1 ? "border-r" : ""}`}>
                    {col.label}
                  </div>
                );
              })}
            </div>
          </div>

          <FixedSizeList height={tableHeight} itemCount={gmails.length} itemSize={ROW_HEIGHT} width={totalWidth} style={{ overflowX: "hidden" }}>
            {Row}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
}
