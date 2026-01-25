import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  value: string | undefined;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export default function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' data-empty={!value} className='data-[empty=true]:text-white/50 justify-start text-left font-normal'>
          <CalendarIcon className='text-white/50' />
          <span className='text-white/50 text-[10px]'>{value ? format(new Date(value), "dd/MM/yyyy") : placeholder || "Chọn ngày"}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={value ? new Date(value) : undefined} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
