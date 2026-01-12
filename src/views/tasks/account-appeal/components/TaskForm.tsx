import { Button, DatePicker, FormItem, Input, Textarea, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { AccountAppeal, CreateAccountAppealRequest } from '../types/accountAppeal.type'

type Props = {
  task?: AccountAppeal | null
  isEdit?: boolean
  loading?: boolean
  onSubmit: (values: CreateAccountAppealRequest) => void
  onCancel: () => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên công việc là bắt buộc'),
  appealDate: Yup.date().required('Ngày kháng là bắt buộc').nullable(),
  appealCount: Yup.number().required('Số lượng kháng là bắt buộc').min(1, 'Số lượng phải lớn hơn 0'),
  assignedUserIds: Yup.array().min(1, 'Phải chọn ít nhất một người nhận việc'),
})

export default function TaskForm({ task, isEdit = false, loading = false, onSubmit, onCancel }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([])

  const initialValues: CreateAccountAppealRequest = {
    name: task?.name || '',
    appealDate: task?.appealDate ? new Date(task.appealDate) : (null as any),
    appealCount: task?.appealCount || (null as any),
    successCount: task?.successCount || undefined,
    assignedUserIds: task?.assignedUsers?.map((u) => u.id) || [],
    note: task?.note || '',
  }

  useEffect(() => {
    if (task?.assignedUsers) {
      const userOptions = task.assignedUsers.map((user) => ({
        value: user.id,
        label: `${user.firstName || ''} ${user.lastName || ''} (${user.username})`.trim(),
        user,
      }))
      setSelectedUsers(userOptions)
    } else {
      setSelectedUsers([])
    }
  }, [task])

  return (
    <div className="task-form">
      <div className="mb-3">
        <h4 className="font-semibold text-gray-900 text-lg">
          {isEdit ? 'Chỉnh sửa kháng tài khoản' : 'Thêm kháng tài khoản mới'}
        </h4>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            assignedUserIds: selectedUsers.map((user) => user.value),
          })
        }}
      >
        {({ values, errors, touched, setFieldValue, handleChange }) => (
          <Form>
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
              <FormItem
                asterisk
                errorMessage={errors.name}
                invalid={touched.name && Boolean(errors.name)}
                label="Tên công việc"
                className="col-span-2"
              >
                <Input name="name" placeholder="Nhập tên công việc..." value={values.name} onChange={handleChange} />
              </FormItem>

              <FormItem
                asterisk
                errorMessage={errors.appealDate as string}
                invalid={touched.appealDate && Boolean(errors.appealDate)}
                label="Ngày kháng"
              >
                <DatePicker
                  inputFormat="DD/MM/YYYY"
                  placeholder="dd/MM/yyyy"
                  value={values.appealDate}
                  onChange={(date) => setFieldValue('appealDate', date)}
                />
              </FormItem>

              <FormItem
                asterisk
                errorMessage={errors.appealCount as string}
                invalid={touched.appealCount && Boolean(errors.appealCount)}
                label="Số lượng kháng"
              >
                <Input
                  name="appealCount"
                  type="number"
                  min={0}
                  placeholder="Nhập số lượng kháng..."
                  value={values.appealCount || ''}
                  onChange={handleChange}
                />
              </FormItem>

              <FormItem
                errorMessage={errors.successCount as string}
                invalid={touched.successCount && Boolean(errors.successCount)}
                label="Số lượng thành công"
              >
                <Input
                  name="successCount"
                  type="number"
                  min={0}
                  placeholder="Nhập số lượng thành công..."
                  value={values.successCount || ''}
                  onChange={handleChange}
                />
              </FormItem>

              <FormItem
                asterisk
                errorMessage={errors.assignedUserIds as string}
                invalid={touched.assignedUserIds && Boolean(errors.assignedUserIds)}
                label="Người nhận việc"
                className="col-span-2"
              >
                <UserSelect
                  isMulti={true}
                  placeholder="Chọn người nhận việc..."
                  value={selectedUsers}
                  onChange={(users) => {
                    setSelectedUsers(users)
                    setFieldValue(
                      'assignedUserIds',
                      users.map((user: UserOption) => user.value),
                    )
                  }}
                />
              </FormItem>

              <FormItem
                label="Ghi chú"
                className="col-span-2"
                errorMessage={errors.note}
                invalid={touched.note && Boolean(errors.note)}
              >
                <Textarea
                  name="note"
                  placeholder="Nhập ghi chú..."
                  rows={3}
                  value={values.note}
                  onChange={handleChange}
                />
              </FormItem>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="plain" onClick={onCancel}>
                Hủy
              </Button>
              <Button loading={loading} type="submit" variant="solid">
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
