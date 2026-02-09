import { useUserStats } from "@/modules/dashboard/hooks/useUserStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { useCountUp } from "@/shared/hooks/useCountUp";

export default function UserStatsCard() {
  const { data: userStats } = useUserStats();

  const totalCount = useCountUp(userStats?.total || 0, { duration: 1500, enableScrollSpy: true });
  const activeCount = useCountUp(userStats?.byStatus.active || 0, { duration: 1500, enableScrollSpy: true });
  const onboardingCount = useCountUp(userStats?.byStatus.onboarding || 0, { duration: 1500, enableScrollSpy: true });
  const inactiveCount = useCountUp(userStats?.byStatus.inactive || 0, { duration: 1500, enableScrollSpy: true });

  return (
    <Card className='hover:shadow-lg transition-all animate-in duration-500 fade-in-50'>
      <CardHeader>
        <CardTitle>Thống kê tài khoản</CardTitle>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='grid grid-cols-2 p-1'>
          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Tài khoản hệ thống</div>
            <div className='font-bold text-lg' ref={totalCount.ref as React.RefObject<HTMLDivElement>}>
              {totalCount.count}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Tài khoản hoạt động</div>
            <div className='font-bold text-green-400 text-lg' ref={activeCount.ref as React.RefObject<HTMLDivElement>}>
              {activeCount.count}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Tài khoản mới Onboard</div>
            <div className='font-bold text-blue-400 text-lg' ref={onboardingCount.ref as React.RefObject<HTMLDivElement>}>
              {onboardingCount.count}
            </div>
          </div>

          <div className='group p-1 text-[9px]'>
            <div className='text-white/50 group-hover:text-white/70 transition-colors'>Tài khoản bị khóa</div>
            <div className='font-bold text-red-400 text-lg' ref={inactiveCount.ref as React.RefObject<HTMLDivElement>}>
              {inactiveCount.count}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
