import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  label?: string;
  value: string | undefined;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function DatePicker({ label, value, onChange, placeholder = "Chọn ngày", disabled }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex flex-col gap-1'>
          {label && <span className="text-[12px] font-['Inter',_sans-serif] font-medium text-black/60">{label}</span>}
          <Button
            type='button'
            variant='outline'
            data-empty={!value}
            className="justify-start border-border font-['Inter',_sans-serif] font-medium text-[14px] tracking-[0.05em] data-[empty=true]:text-black text-left normal-case px-4"
            disabled={disabled}>
            <CalendarIcon />
            <span>{value ? format(new Date(value), "dd/MM/yyyy") : placeholder}</span>
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent className='p-0 w-auto'>
        <Calendar mode='single' selected={value ? new Date(value) : undefined} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
