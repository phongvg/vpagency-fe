import type { UpdateProfileFormType } from "@/modules/me/schemas/update-profile-form.schema";
import { FormInput } from "@/shared/components/form/FormInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useAuthStore } from "@/shared/stores/auth/useAuthStore";
import { getInitials } from "@/shared/utils/common.util";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export default function UpdateProfileForm() {
  const { control } = useFormContext<UpdateProfileFormType>();
  const { user } = useAuthStore();
  const avatarValue = useWatch({ control, name: "avatar" });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!(avatarValue instanceof File)) {
      setAvatarPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(avatarValue);
    setAvatarPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [avatarValue]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleAvatarClick();
    }
  };

  return (
    <div className='gap-4 grid grid-cols-2'>
      <div className='flex flex-col items-center gap-3 col-span-2'>
        <Avatar className='w-24 h-24 cursor-pointer' role='button' tabIndex={0} onClick={handleAvatarClick} onKeyDown={handleAvatarKeyDown}>
          <AvatarImage
            src={avatarPreview || user?.avatar || undefined}
            alt={user?.lastName && user?.firstName ? `${user.lastName} ${user.firstName}` : "Avatar"}
          />
          <AvatarFallback>{getInitials(user?.lastName && user?.firstName ? `${user.lastName} ${user.firstName}` : "U")}</AvatarFallback>
        </Avatar>

        <Controller
          name='avatar'
          control={control}
          render={({ field, fieldState }) => (
            <div className='flex flex-col items-center gap-2 w-full max-w-sm'>
              <Input
                ref={fileInputRef}
                id='avatar'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(event) => field.onChange(event.target.files?.[0] ?? null)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />
      </div>

      <FormInput name='username' label='Tên đăng nhập' className='col-span-2' />
      <FormInput name='firstName' label='Họ và tên đệm' required />
      <FormInput name='lastName' label='Tên' required />
      <FormInput name='email' label='Email' className='col-span-2' required />
    </div>
  );
}
