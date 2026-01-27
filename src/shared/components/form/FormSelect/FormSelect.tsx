import { AppSelect } from "@/shared/components/common/AppSelect";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { Controller, useFormContext } from "react-hook-form";

interface FormSelectProps {
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function FormSelect({ name, label, options, placeholder, disabled, required, className }: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          {label && (
            <FieldLabel htmlFor={name}>
              {label}
              {required && <span className='text-red-500'>*</span>}
            </FieldLabel>
          )}

          <AppSelect options={options} value={field.value} onValueChange={field.onChange} placeholder={placeholder} disabled={disabled} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
