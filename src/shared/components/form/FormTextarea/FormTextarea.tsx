import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";

interface FormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function FormTextarea({ name, label, placeholder, disabled, required, className }: FormTextareaProps) {
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

          <Textarea {...field} id={name} placeholder={placeholder} disabled={disabled} aria-invalid={fieldState.invalid} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
