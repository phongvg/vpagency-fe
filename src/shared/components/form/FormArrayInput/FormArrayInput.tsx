import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormArrayInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function FormArrayInput({ name, label, placeholder, disabled, required, className }: FormArrayInputProps) {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const items = field.value || [];

        const handleAdd = () => {
          if (inputValue.trim()) {
            field.onChange([...items, inputValue.trim()]);
            setInputValue("");
          }
        };

        const handleRemove = (index: number) => {
          const newItems = items.filter((_: string, i: number) => i !== index);
          field.onChange(newItems.length > 0 ? newItems : null);
        };

        const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        };

        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            {label && (
              <FieldLabel htmlFor={name}>
                {label}
                {required && <span className='text-red-500'>*</span>}
              </FieldLabel>
            )}

            {items.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {items.slice(0, 3).map((item: string, index: number) => (
                  <div key={index} className='flex items-center gap-1 px-3 py-1 border-2 border-primary rounded-md text-primary'>
                    <div className='max-w-[100px] truncate'>{item}</div>
                    <button type='button' onClick={() => handleRemove(index)} disabled={disabled}>
                      <X className='w-3 h-3' />
                    </button>
                  </div>
                ))}
                {items.length > 3 && (
                  <div className='flex items-center gap-1 px-3 py-1 border-2 border-primary rounded-md text-primary'>
                    <span>+{items.length - 3}</span>
                  </div>
                )}
              </div>
            )}

            <div className='flex gap-2'>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                id={name}
                type='text'
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={fieldState.invalid}
              />
              <Button type='button' onClick={handleAdd} disabled={disabled || !inputValue.trim()} variant='outline' size='icon'>
                <Plus className='w-2 h-2 text-primary' />
              </Button>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
