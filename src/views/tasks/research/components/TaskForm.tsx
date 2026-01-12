import { Button, DatePicker, FormItem, Input, Select, Textarea, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { CreateResearchRequest, Research, ResearchDifficulty } from '../types/research.type'

type Props = {
  task?: Research | null
  isEdit?: boolean
  loading?: boolean
  onSubmit: (values: CreateResearchRequest) => void
  onCancel: () => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên công việc là bắt buộc'),
  startDate: Yup.date().required('Ngày bắt đầu là bắt buộc').nullable(),
  content: Yup.string().required('Nội dung nghiên cứu là bắt buộc'),
  difficulty: Yup.string().required('Độ khó là bắt buộc'),
  assignedUserIds: Yup.array().min(1, 'Phải chọn ít nhất một người nhận việc'),
})

const difficultyOptions = [
  { value: ResearchDifficulty.EASY, label: 'Dễ' },
  { value: ResearchDifficulty.MEDIUM, label: 'Trung bình' },
  { value: ResearchDifficulty.HARD, label: 'Khó' },
]

export default function TaskForm({ task, isEdit = false, loading = false, onSubmit, onCancel }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([])

  const initialValues: CreateResearchRequest = {
    name: task?.name || '',
    startDate: task?.startDate ? new Date(task.startDate) : (null as any),
    content: task?.content || '',
    difficulty: task?.difficulty || ResearchDifficulty.MEDIUM,
    result: task?.result || '',
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
          {isEdit ? 'Chỉnh sửa nghiên cứu' : 'Thêm nghiên cứu mới'}
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
                errorMessage={errors.startDate as string}
                invalid={touched.startDate && Boolean(errors.startDate)}
                label="Ngày bắt đầu"
              >
                <DatePicker
                  inputFormat="DD/MM/YYYY"
                  placeholder="dd/MM/yyyy"
                  value={values.startDate}
                  onChange={(date) => setFieldValue('startDate', date)}
                />
              </FormItem>

              <FormItem
                asterisk
                errorMessage={errors.difficulty as string}
                invalid={touched.difficulty && Boolean(errors.difficulty)}
                label="Độ khó"
              >
                <Select
                  name="difficulty"
                  options={difficultyOptions}
                  placeholder="Chọn độ khó"
                  value={difficultyOptions.find((opt) => opt.value === values.difficulty)}
                  onChange={(option: { value: ResearchDifficulty; label: string } | null) =>
                    setFieldValue('difficulty', option?.value || null)
                  }
                />
              </FormItem>

              <FormItem
                asterisk
                errorMessage={errors.content}
                invalid={touched.content && Boolean(errors.content)}
                label="Nội dung nghiên cứu"
                className="col-span-2"
              >
                <Textarea
                  name="content"
                  placeholder="Mô tả nội dung cần nghiên cứu..."
                  rows={4}
                  value={values.content}
                  onChange={handleChange}
                />
              </FormItem>

              <FormItem
                errorMessage={errors.result}
                invalid={touched.result && Boolean(errors.result)}
                label="Kết quả nghiên cứu"
                className="col-span-2"
              >
                <Textarea
                  name="result"
                  placeholder="Nhập kết quả nghiên cứu..."
                  rows={4}
                  value={values.result}
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
