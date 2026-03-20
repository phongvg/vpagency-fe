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
        "block bg-white disabled:opacity-50 h-9 px-3 py-0 border-[3px] border-black rounded-none outline-none w-full text-xs font-bold placeholder:text-black/40 placeholder:italic placeholder:font-normal placeholder:text-xs appearance-none disabled:cursor-not-allowed text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all",
        className
      )}
      disabled={disabled}
    />
  );
}
