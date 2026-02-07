import { selectStyles } from "@/shared/components/common/AsyncSelect/async-select.config";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { useCallback, useMemo } from "react";
import Select, { type SingleValue } from "react-select";

export interface AppSelectProps {
  value?: SelectOption | SelectOption[] | null;
  onValueChange?: (value: string | SelectOption | SelectOption[] | null) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
}

export default function AppSelect({ value, onValueChange, options, placeholder = "", disabled, isMulti = false }: AppSelectProps) {
  const selectedOption = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return options.filter((opt) => value.some((val) => val.value === opt.value));
    }

    return options.find((opt) => opt.value === (value as SelectOption)?.value) ?? null;
  }, [options, value, isMulti]);

  const handleChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (isMulti) {
        onValueChange?.(option);
      } else {
        const optionSelected = option?.value ?? null;
        onValueChange?.(optionSelected);
      }
    },
    [onValueChange, isMulti]
  );

  return (
    <Select
      styles={selectStyles}
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      isDisabled={disabled}
      noOptionsMessage={() => "KHÔNG CÓ DỮ LIỆU"}
      components={{ IndicatorSeparator: null }}
      isMulti={isMulti as any}
    />
  );
}
