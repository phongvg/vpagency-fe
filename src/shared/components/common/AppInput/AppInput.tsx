import { Input } from "@/shared/components/ui/input";
import React from "react";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function AppInput({ label, ...props }: AppInputProps) {
  return (
    <div className='flex flex-col gap-1'>
      {label && <span className='text-[8px] text-white/50'>{label}</span>}
      <Input {...props} />
    </div>
  );
}
