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
          {label && <span className='text-[8px] text-white/50'>{label}</span>}
          <Button
            type='button'
            variant='outline'
            data-empty={!value}
            className='justify-start border-border font-normal data-[empty=true]:text-white/50 text-left normal-case'
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
