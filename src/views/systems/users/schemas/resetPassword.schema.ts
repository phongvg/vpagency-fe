import * as Yup from 'yup'

export const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu mới không được bỏ trống'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp')
    .required('Xác nhận mật khẩu không được bỏ trống'),
})
