import type { SelectOption } from "@/shared/types/common/select-option.type";

export const gendersOptions: SelectOption[] = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "both", label: "Nam và Nữ" },
];

export const ageRangeOptions: SelectOption[] = [
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55-64", label: "55-64" },
  { value: "65+", label: "65+" },
  { value: "unknown", label: "Khác" },
];
