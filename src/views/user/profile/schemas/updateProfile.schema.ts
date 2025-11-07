import * as Yup from 'yup'

export const updateProfileValidationSchema = Yup.object().shape({
  avatar: Yup.mixed().nullable(),
  firstName: Yup.string().required('Họ không được bỏ trống'),
  lastName: Yup.string().required('Tên không được bỏ trống'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống'),
})
