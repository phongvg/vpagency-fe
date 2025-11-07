import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Tên đăng nhập không được bỏ trống'),
  password: Yup.string().required('Mật khẩu không được bỏ trống'),
  rememberMe: Yup.bool(),
})
