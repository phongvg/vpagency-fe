import { differenceInDays, endOfDay, isPast } from "date-fns";

export interface DeadlineInfo {
  daysLeft: number;
  isOverdue: boolean;
  isUrgent: boolean;
  isWarning: boolean;
  color: string;
  bgColor: string;
  label: string;
  shouldPulse: boolean;
}

export function getDeadlineInfo(deadline: string | Date): DeadlineInfo {
  const deadlineDate = typeof deadline === "string" ? new Date(deadline) : deadline;

  // Lấy cuối ngày của deadline (23:59:59.999)
  const endOfDeadlineDay = endOfDay(deadlineDate);
  const now = new Date();

  // Tính số ngày còn lại (so với cuối ngày)
  const daysLeft = differenceInDays(endOfDeadlineDay, now);

  // Chỉ coi là overdue khi đã qua cuối ngày deadline
  const isOverdue = isPast(endOfDeadlineDay);

  let color = "text-green-400";
  let bgColor = "bg-green-500/10";
  let label = "";
  let shouldPulse = false;

  if (isOverdue) {
    const daysOverdue = Math.abs(daysLeft);

    if (daysOverdue === 0) {
      // Trường hợp đặc biệt: vừa hết deadline (sau 23:59:59)
      color = "text-yellow-400";
      bgColor = "bg-yellow-500/20";
      label = "Vừa hết hạn";
      shouldPulse = true;
    } else if (daysOverdue <= 2) {
      // Trễ 1-2 ngày
      color = "text-yellow-400";
      bgColor = "bg-yellow-500/20";
      label = `Trễ ${daysOverdue} ngày`;
      shouldPulse = true;
    } else {
      // Trễ hơn 2 ngày
      color = "text-red-400";
      bgColor = "bg-red-500/20";
      label = `Trễ ${daysOverdue} ngày`;
      shouldPulse = true;
    }
  } else if (daysLeft === 0) {
    // Hôm nay là deadline
    color = "text-orange-400";
    bgColor = "bg-orange-500/20";
    label = "Hôm nay";
    shouldPulse = true;
  } else if (daysLeft === 1) {
    color = "text-orange-400";
    bgColor = "bg-orange-500/20";
    label = "Ngày mai";
    shouldPulse = true;
  } else if (daysLeft <= 3) {
    color = "text-yellow-400";
    bgColor = "bg-yellow-500/20";
    label = `Còn ${daysLeft} ngày`;
  } else {
    color = "text-green-400";
    bgColor = "bg-green-500/10";
    label = `Còn ${daysLeft} ngày`;
  }

  return {
    daysLeft,
    isOverdue,
    isUrgent: daysLeft <= 1 && !isOverdue,
    isWarning: daysLeft <= 3 && daysLeft > 1,
    color,
    bgColor,
    label,
    shouldPulse,
  };
}

export const getDeadlineColor = (daysLeft: number, isOverdue: boolean): string => {
  if (!isOverdue) {
    // Còn hạn - màu xanh lá
    return "bg-green-500/10 text-green-400 border border-green-500/20";
  }

  const daysOverdue = Math.abs(daysLeft);

  if (daysOverdue <= 2) {
    // Trễ 0-2 ngày - màu vàng
    return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
  }

  // Trễ hơn 2 ngày - màu đỏ
  return "bg-red-500/10 text-red-400 border border-red-500/20";
};
