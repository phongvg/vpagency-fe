import AppSelect from "@/shared/components/common/AppSelect";
import type { AppSelectProps } from "@/shared/components/common/AppSelect/AppSelect";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";

interface FormSelectProps extends AppSelectProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export default function FormSelect({ name, label, options, placeholder, disabled, required, className, isMulti }: FormSelectProps) {
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

          <AppSelect
            options={options}
            value={field.value}
            onValueChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
            isMulti={isMulti}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
