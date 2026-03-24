import { selectStyles } from "@/shared/components/common/AsyncSelect/async-select.config";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { useCallback, useMemo } from "react";
import Select, { type MenuPlacement, type SingleValue } from "react-select";

export interface AppSelectProps {
  label?: string;
  value?: string | SelectOption | SelectOption[] | null;
  onValueChange?: (value: string | SelectOption | SelectOption[] | null) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
  menuPlacement?: MenuPlacement;
}

export default function AppSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder = "",
  disabled,
  isMulti = false,
  menuPlacement = "top",
}: AppSelectProps) {
  const selectedOption = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return options.filter((opt) => value.some((val) => val.value === opt.value));
    }

    return options.find((opt) => opt.value === value) ?? null;
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
    <div className='flex flex-col gap-1'>
      {label && <span className="text-[12px] font-['Inter',_sans-serif] font-medium text-white/60">{label}</span>}
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
        menuPlacement={menuPlacement}
      />
    </div>
  );
}
