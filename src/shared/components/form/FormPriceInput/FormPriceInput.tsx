import PriceInput from "@/shared/components/common/PriceInput/PriceInput";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";

interface FormPriceInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function FormPriceInput({ name, label, placeholder, disabled, required, className }: FormPriceInputProps) {
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

          <PriceInput {...field} id={name} placeholder={placeholder} disabled={disabled} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
