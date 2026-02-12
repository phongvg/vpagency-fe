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
      className={cn(
        "block bg-transparent disabled:opacity-50 p-[10px] border border-border outline-none w-full font-semibold appearance-none disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled}
    />
  );
}
