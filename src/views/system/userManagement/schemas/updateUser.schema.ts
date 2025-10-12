import * as Yup from 'yup'

export const updateUserValidationSchema = Yup.object().shape({
  username: Yup.string().required('Tên đăng nhập không được bỏ trống'),
  firstName: Yup.string().required('Họ không được bỏ trống'),
  lastName: Yup.string().required('Tên không được bỏ trống'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống'),
  roles: Yup.array()
    .min(1, 'Vai trò không được bỏ trống')
    .required('Vai trò không được bỏ trống'),
})
