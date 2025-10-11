import * as Yup from 'yup'

export const updateInfoValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Tên đăng nhập không được bỏ trống')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username chỉ được chứa chữ, số và dấu gạch dưới, không có khoảng trắng hoặc ký tự đặc biệt',
    ),
  firstName: Yup.string().required('Họ không được bỏ trống'),
  lastName: Yup.string().required('Tên không được bỏ trống'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống'),
  password: Yup.string()
    .required('Mật khẩu không được bỏ trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})
