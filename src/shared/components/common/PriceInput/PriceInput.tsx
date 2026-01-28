import { cn } from "@/shared/libs/utils";
import { NumericFormat } from "react-number-format";

interface PriceInputProps {
  id?: string;
  value?: number;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function PriceInput({ id, value, onChange, placeholder, disabled, className }: PriceInputProps) {
  return (
    <NumericFormat
      id={id}
      thousandSeparator=','
      decimalSeparator='.'
      allowNegative={false}
      placeholder={placeholder}
      value={value ?? null}
      onValueChange={(values) => onChange?.(values.floatValue ?? null)}
      className={cn("block w-full p-[10px] font-semibold appearance-none bg-transparent border-border border outline-none text-white/50", className)}
      disabled={disabled}
    />
  );
}
