import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import { Role } from "@/shared/constants/role.constant";
import { Controller, useFormContext } from "react-hook-form";

const ROLE_LABELS: Record<Role, string> = {
  [Role.ADMIN]: "Quản trị viên",
  [Role.MANAGER_AFF]: "Quản lý Affiliate",
  [Role.MANAGER_AGENCY]: "Quản lý Agency",
  [Role.ACCOUNTING]: "Kế toán",
  [Role.MEMBER_AFF]: "Thành viên Affiliate",
  [Role.MEMBER_AGENCY]: "Thành viên Agency",
  [Role.USER]: "Người dùng",
};

interface RoleSelectorProps {
  name: string;
  label?: string;
  required?: boolean;
}

export default function RoleSelector({ name, label, required }: RoleSelectorProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel>
              {label}
              {required && <span className='text-red-500'>*</span>}
            </FieldLabel>
          )}

          <div className='gap-4 grid grid-cols-2'>
            {Object.entries(Role).map(([_, value]) => {
              const isChecked = field.value?.includes(value) || false;

              return (
                <div key={value} className='flex justify-between items-center bg-card p-4 border border-border rounded-lg'>
                  <div className='space-y-0.5'>
                    <label htmlFor={`${name}-${value}`} className='font-medium text-primary text-sm cursor-pointer'>
                      {ROLE_LABELS[value]}
                    </label>
                  </div>

                  <Switch
                    id={`${name}-${value}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const currentRoles = field.value || [];
                      if (checked) {
                        field.onChange([...currentRoles, value]);
                      } else {
                        field.onChange(currentRoles.filter((role: string) => role !== value));
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
