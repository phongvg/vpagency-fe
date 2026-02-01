import type { UpdateGmailRequest } from "@/modules/gmail/types/gmail.type";
import { useCallback, useMemo } from "react";
import { FixedSizeList } from "react-window";

interface VirtualGmailTableProps {
  gmails: UpdateGmailRequest[];
}

const HEIGHT = 760;
const ROW_HEIGHT = 80;
const HEADER_HEIGHT = 56;

export default function VirtualGmailTable({ gmails }: VirtualGmailTableProps) {
  const tableHeight = useMemo(() => HEIGHT - HEADER_HEIGHT, []);

  const columnWidths = useMemo(
    () => ({
      stt: 60,
      profileName: 200,
      email: 350,
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
          <div style={{ width: columnWidths.profileName, minWidth: columnWidths.profileName }} className='flex items-center px-4 border-r'>
            <span>{account.profileName}</span>
          </div>
          <div style={{ width: columnWidths.email, minWidth: columnWidths.email }} className='flex items-center px-4 border-r'>
            <span>{account.name}</span>
          </div>
          <div style={{ width: columnWidths.password, minWidth: columnWidths.password }} className='flex items-center px-4 border-r'>
            <span>{account.password}</span>
          </div>
          <div style={{ width: columnWidths.recoverMail, minWidth: columnWidths.recoverMail }} className='flex items-center px-4 border-r'>
            <span>{account.recoverMail}</span>
          </div>
          <div style={{ width: columnWidths.phone, minWidth: columnWidths.phone }} className='flex items-center px-4 border-r'>
            <span>{account.phone}</span>
          </div>
          <div style={{ width: columnWidths.code2fa, minWidth: columnWidths.code2fa }} className='flex items-center px-4 border-r'>
            <span>{account.code2fa}</span>
          </div>
          <div style={{ width: columnWidths.appPassword, minWidth: columnWidths.appPassword }} className='flex items-center px-4 border-r'>
            <span>{account.appPassword}</span>
          </div>
          <div
            style={{ width: columnWidths.createdYear, minWidth: columnWidths.createdYear }}
            className='flex justify-center items-center px-4 border-r'>
            <span>{account.createdYear}</span>
          </div>
          <div style={{ width: columnWidths.proxy, minWidth: columnWidths.proxy }} className='flex items-center px-4 border-r'>
            <span>{account.proxy}</span>
          </div>
          <div style={{ width: columnWidths.price, minWidth: columnWidths.price }} className='flex items-center px-4 border-r'>
            <span>{account.price ? `$${account.price.toFixed(2)}` : ""}</span>
          </div>
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
              <div
                style={{ width: columnWidths.profileName, minWidth: columnWidths.profileName }}
                className='flex items-center px-4 border-r font-semibold'>
                Tên hồ sơ
              </div>
              <div style={{ width: columnWidths.email, minWidth: columnWidths.email }} className='flex items-center px-4 border-r font-semibold'>
                Email
              </div>
              <div
                style={{ width: columnWidths.password, minWidth: columnWidths.password }}
                className='flex items-center px-4 border-r font-semibold'>
                Mật khẩu
              </div>
              <div
                style={{ width: columnWidths.recoverMail, minWidth: columnWidths.recoverMail }}
                className='flex items-center px-4 border-r font-semibold'>
                Email khôi phục
              </div>
              <div style={{ width: columnWidths.phone, minWidth: columnWidths.phone }} className='flex items-center px-4 border-r font-semibold'>
                Số điện thoại
              </div>
              <div style={{ width: columnWidths.code2fa, minWidth: columnWidths.code2fa }} className='flex items-center px-4 border-r font-semibold'>
                Mã 2FA
              </div>
              <div
                style={{ width: columnWidths.appPassword, minWidth: columnWidths.appPassword }}
                className='flex items-center px-4 border-r font-semibold'>
                Mật khẩu ứng dụng
              </div>
              <div
                style={{ width: columnWidths.createdYear, minWidth: columnWidths.createdYear }}
                className='flex items-center px-4 border-r font-semibold'>
                Năm tạo
              </div>
              <div style={{ width: columnWidths.proxy, minWidth: columnWidths.proxy }} className='flex items-center px-4 border-r font-semibold'>
                Proxy
              </div>
              <div style={{ width: columnWidths.price, minWidth: columnWidths.price }} className='flex items-center px-4 border-r font-semibold'>
                Tiền
              </div>
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
