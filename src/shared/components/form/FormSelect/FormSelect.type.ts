import type { SelectOption } from "@/shared/types/common/select-option.type";

export type FormSelectProps = {
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};
