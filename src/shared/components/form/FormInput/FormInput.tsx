import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import type { FormInputProps } from "./FormInput.type";

export default function FormInput({ name, label, placeholder, type = "text", disabled, required, className }: FormInputProps) {
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
              {required && <span className='text-red-500 ml-1'>*</span>}
            </FieldLabel>
          )}

          <Input {...field} id={name} type={type} placeholder={placeholder} disabled={disabled} maxLength={255} aria-invalid={fieldState.invalid} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
