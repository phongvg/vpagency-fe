import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";

export default function UserStatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê tài khoản</CardTitle>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='grid grid-cols-2 p-1'>
          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Tài khoản hệ thống</div>
            <div className='font-bold'>12</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Tài khoản hoạt động</div>
            <div className='font-bold'>12</div>
          </div>

          <div className='p-1 text-[9px]'>
            <div className='text-white/50'>Tài khoản bị khóa</div>
            <div className='font-bold'>12</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
