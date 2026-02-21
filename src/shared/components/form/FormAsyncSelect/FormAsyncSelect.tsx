import AsyncSelect from "@/shared/components/common/AsyncSelect";
import type { AsyncSelectProps } from "@/shared/components/common/AsyncSelect/AsyncSelect";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";

interface FormAsyncSelectProps<T> extends AsyncSelectProps<T> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export default function FormAsyncSelect<T>({
  name,
  label,
  fetcher,
  mapOption,
  placeholder,
  disabled,
  required,
  className,
  isMulti,
}: FormAsyncSelectProps<T>) {
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

          <AsyncSelect<T>
            value={field.value}
            onChange={field.onChange}
            fetcher={fetcher}
            mapOption={mapOption}
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
