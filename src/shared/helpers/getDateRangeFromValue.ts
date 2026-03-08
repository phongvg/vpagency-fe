import { DATE_RANGE_VALUES } from "@/shared/constants/dateRange.constant";
import { endOfDay, format, startOfDay, subDays } from "date-fns";

export interface DateRange {
  fromDate?: string;
  toDate?: string;
}

export const getDateRangeFromValue = (value: string): DateRange => {
  const today = new Date();

  switch (value) {
    case DATE_RANGE_VALUES.TODAY:
      return {
        fromDate: format(startOfDay(today), "yyyy-MM-dd"),
        toDate: format(endOfDay(today), "yyyy-MM-dd"),
      };

    case DATE_RANGE_VALUES.YESTERDAY:
      const yesterday = subDays(today, 1);
      return {
        fromDate: format(startOfDay(yesterday), "yyyy-MM-dd"),
        toDate: format(endOfDay(yesterday), "yyyy-MM-dd"),
      };

    case DATE_RANGE_VALUES.LAST_7_DAYS:
      return {
        fromDate: format(startOfDay(subDays(today, 6)), "yyyy-MM-dd"),
        toDate: format(endOfDay(today), "yyyy-MM-dd"),
      };

    case DATE_RANGE_VALUES.LAST_30_DAYS:
      return {
        fromDate: format(startOfDay(subDays(today, 29)), "yyyy-MM-dd"),
        toDate: format(endOfDay(today), "yyyy-MM-dd"),
      };

    case DATE_RANGE_VALUES.ALL_TIME:
      return {
        fromDate: undefined,
        toDate: undefined,
      };

    default:
      return {};
  }
};
