import Crown from "@/assets/images/crown.png";
import Medal1 from "@/assets/images/medal-1.png";
import { useEmployeeRanking } from "@/modules/employeePerfomance/hooks/useEmployeeRanking";
import type { EmployeeRanking } from "@/modules/employeePerfomance/types/employeePerformance.type";
import UserAvatar from "@/shared/components/UserAvatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { ACCESS_TOKEN, SESSION_KEY } from "@/shared/constants/auth.constant";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { useRankingPopupStore } from "@/shared/stores/rankingPopup/useRankingPopupStore";
import { formatDollarAmount } from "@/shared/utils/common.util";
import { getStorageItem } from "@/shared/utils/storage.util";
import { formatDate, startOfMonth } from "date-fns";
import { useEffect } from "react";

const rankingCards: { title: string; key: keyof EmployeeRanking; formatValue: (v: number) => string }[] = [
  { title: "Top Chi Phí", key: "byCost", formatValue: (v) => formatDollarAmount(v) },
  { title: "Top Ref", key: "byRef", formatValue: (v) => v.toLocaleString() },
  { title: "Top Dự Án Active", key: "byActiveProjects", formatValue: (v) => v.toLocaleString() },
];

function TopRankingPopupContent() {
  const { open, setOpen } = useRankingPopupStore();

  const { data } = useEmployeeRanking({
    dateFrom: formatDate(startOfMonth(new Date()), "yyyy-MM-dd"),
    dateTo: formatDate(new Date(), "yyyy-MM-dd"),
  });

  useEffect(() => {
    if (!data || sessionStorage.getItem(SESSION_KEY)) return;

    const hasAnyTop1 = rankingCards.some(({ key }) => data[key]?.some((d) => d.rank === 1));

    if (!hasAnyTop1) return;

    sessionStorage.setItem(SESSION_KEY, "true");
    setOpen(true);
  }, [data, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='grid-cols-1 max-w-3xl overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='text-2xl text-center'>🏆 Top nhân viên tháng này</DialogTitle>
        </DialogHeader>

        <div className='gap-6 grid grid-cols-3 pt-4'>
          {rankingCards.map(({ title, key, formatValue }) => {
            const top1 = data?.[key]?.find((d) => d.rank === 1);
            if (!top1) return null;

            return (
              <div key={key} className='flex flex-col items-center gap-3 text-center'>
                <p className='font-semibold text-muted-foreground text-xs uppercase tracking-widest'>{title}</p>

                <div className='relative mt-6'>
                  <img src={Crown} className='-top-7 left-1/2 z-10 absolute w-10 h-10 -translate-x-1/2' alt='crown' loading='lazy' />
                  <UserAvatar data={{ firstName: top1.firstName, lastName: top1.lastName, avatar: top1.avatar }} size='3xl' />
                  <img src={Medal1} className='-bottom-3 left-1/2 absolute w-8 h-8 scale-110 -translate-x-1/2' alt='medal' loading='lazy' />
                </div>

                <div className='space-y-1 mt-3'>
                  <p className='font-semibold text-yellow-300 text-lg'>
                    {top1.firstName} {top1.lastName}
                  </p>
                  <p className='font-bold text-primary text-sm'>{formatValue(top1.value)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TopRankingPopup() {
  const { isAuthenticated } = useAuthStore();
  const token = getStorageItem<string | null>(ACCESS_TOKEN, null);

  if (!isAuthenticated && !token) return null;

  return <TopRankingPopupContent />;
}
