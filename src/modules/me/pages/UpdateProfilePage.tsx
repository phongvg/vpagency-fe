import { urls } from "@/app/routes/route.constant";
import UpdateProfileForm from "@/modules/me/components/UpdateProfileForm";
import { useUpdateProfile } from "@/modules/me/hooks/useUpdateProfile";
import { updateProfilePageFormSchema, type UpdateProfilePageFormType } from "@/modules/me/schemas/update-profile-form.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import AppButton from "@/shared/components/common/AppButton";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function UpdateProfilePage() {
  const navigate = useNavigate();

  const updateProfile = useUpdateProfile();

  const form = useForm<UpdateProfilePageFormType>({
    resolver: zodResolver(updateProfilePageFormSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatar: null,
    },
  });

  const onSubmit = async (values: UpdateProfilePageFormType) => {
    const formData = new FormData();

    if (values.username) {
      formData.append("username", values.username);
    }

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);

    if (values.avatar instanceof File) {
      formData.append("avatar", values.avatar);
    }

    await updateProfile.mutateAsync(formData);

    setTimeout(() => {
      navigate(`${urls.root}${urls.dashboard}`, { replace: true });
    }, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cập nhật thông tin cá nhân</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <UpdateProfileForm showPasswordField={true} />

            <div className='flex justify-end gap-2'>
              <AppButton type='submit' variant='outline' size='sm' disabled={updateProfile.isPending}>
                <Save />
                {updateProfile.isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </AppButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
