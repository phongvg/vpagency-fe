import { AsyncSelect } from "@/shared/components/common/AsyncSelect";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import type { Meta } from "@/shared/types/common/apiResponse.type";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { Controller, useFormContext } from "react-hook-form";

interface FormAsyncSelectProps<T> {
  name: string;
  label?: string;
  fetcher?: (params: { search: string; page: number }) => Promise<{
    items: T[];
    meta: Meta;
  }>;
  mapOption?: (item: T) => SelectOption;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  isMulti?: boolean;
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
