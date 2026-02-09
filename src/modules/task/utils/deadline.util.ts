import { differenceInDays, differenceInHours, isPast } from "date-fns";

export interface DeadlineInfo {
  daysLeft: number;
  hoursLeft: number;
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
  const now = new Date();

  const daysLeft = differenceInDays(deadlineDate, now);
  const hoursLeft = differenceInHours(deadlineDate, now);
  const isOverdue = isPast(deadlineDate);

  let color = "text-green-400";
  let bgColor = "bg-green-500/10";
  let label = "";
  let shouldPulse = false;

  if (isOverdue) {
    color = "text-red-400";
    bgColor = "bg-red-500/20";
    label = `Trễ ${Math.abs(daysLeft)} ngày`;
    shouldPulse = true;
  } else if (daysLeft === 0) {
    color = "text-red-400";
    bgColor = "bg-red-500/20";
    label = `Còn ${hoursLeft}h`;
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
    hoursLeft,
    isOverdue,
    isUrgent: daysLeft <= 1,
    isWarning: daysLeft <= 3 && daysLeft > 1,
    color,
    bgColor,
    label,
    shouldPulse,
  };
}
