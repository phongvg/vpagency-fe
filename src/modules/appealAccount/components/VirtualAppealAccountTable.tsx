import type { UpdateAppealAccountRequest } from "@/modules/appealAccount/types/appealAccount.type";
import { useCallback, useMemo } from "react";
import { FixedSizeList } from "react-window";

interface VirtualAppealAccountTableProps {
  appealAccounts: UpdateAppealAccountRequest[];
}

const HEIGHT = 660;
const ROW_HEIGHT = 80;
const HEADER_HEIGHT = 56;

const columns = [
  { key: "profileName", align: "items-center" },
  { key: "email", align: "items-center" },
  { key: "password", align: "items-center" },
  { key: "recoveryEmail", align: "items-center" },
  { key: "twoFa", align: "items-center" },
  { key: "mcc", align: "items-center" },
  { key: "uid", align: "justify-center items-center" },
  { key: "appealPlatform", align: "items-center" },
  { key: "appealedBy", align: "items-center" },
  { key: "usedBy", align: "items-center" },
  { key: "note", align: "items-center" },
  { key: "note2", align: "items-center" },
  { key: "rarityLevel", align: "items-center" },
];

const headerColumns = [
  { key: "profileName", label: "Tên hồ sơ" },
  { key: "email", label: "Email" },
  { key: "password", label: "Mật khẩu" },
  { key: "recoveryEmail", label: "Email khôi phục" },
  { key: "twoFa", label: "Mã 2FA" },
  { key: "mcc", label: "MCC" },
  { key: "uid", label: "UID" },
  { key: "appealPlatform", label: "Sàn kháng được" },
  { key: "appealedBy", label: "Người kháng" },
  { key: "usedBy", label: "Người sử dụng" },
  { key: "note", label: "Ghi chú" },
  { key: "note2", label: "Ghi chú 2" },
  { key: "rarityLevel", label: "Mức độ hiếm" },
];

export default function VirtualAppealAccountTable({ appealAccounts }: VirtualAppealAccountTableProps) {
  const tableHeight = useMemo(() => HEIGHT - HEADER_HEIGHT, []);

  const columnWidths = useMemo(
    () => ({
      stt: 60,
      profileName: 200,
      email: 350,
      password: 250,
      recoveryEmail: 350,
      twoFa: 150,
      mcc: 150,
      uid: 150,
      appealPlatform: 200,
      appealedBy: 200,
      usedBy: 200,
      note: 300,
      note2: 300,
      rarityLevel: 150,
    }),
    []
  );

  const totalWidth = useMemo(() => Object.values(columnWidths).reduce((sum, width) => sum + width, 0), [columnWidths]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const account = appealAccounts[index];

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

          {columns.map((col, index) => {
            const width = columnWidths[col.key as keyof typeof columnWidths];

            return (
              <div
                key={col.key}
                style={{ width, minWidth: width }}
                className={`flex px-4 ${col.align} ${index !== columns.length - 1 ? "border-r" : ""}`}>
                <span>{account[col.key as keyof UpdateAppealAccountRequest]}</span>
              </div>
            );
          })}
        </div>
      );
    },
    [appealAccounts, columnWidths]
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

              {headerColumns.map((col, index) => {
                const width = columnWidths[col.key as keyof typeof columnWidths];

                return (
                  <div
                    key={col.key}
                    style={{ width, minWidth: width }}
                    className={`flex items-center px-4 font-semibold ${index !== columns.length - 1 ? "border-r" : ""}`}>
                    {col.label}
                  </div>
                );
              })}
            </div>
          </div>

          <FixedSizeList
            height={tableHeight}
            itemCount={appealAccounts.length}
            itemSize={ROW_HEIGHT}
            width={totalWidth}
            style={{ overflowX: "hidden" }}>
            {Row}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
}
