export const DATE_RANGE_VALUES = {
  TODAY: "today",
  YESTERDAY: "yesterday",
  LAST_7_DAYS: "last_7_days",
  LAST_30_DAYS: "last_30_days",
  THIS_MONTH: "this_month",
  LAST_MONTH: "last_month",
  ALL_TIME: "all_time",
};

export const DATE_RANGE_OPTIONS = [
  { label: "Hôm nay", value: DATE_RANGE_VALUES.TODAY },
  { label: "Hôm qua", value: DATE_RANGE_VALUES.YESTERDAY },
  { label: "7 ngày qua", value: DATE_RANGE_VALUES.LAST_7_DAYS },
  { label: "30 ngày qua", value: DATE_RANGE_VALUES.LAST_30_DAYS },
  { label: "Tất cả thời gian", value: DATE_RANGE_VALUES.ALL_TIME },
];
