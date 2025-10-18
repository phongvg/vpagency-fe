import { Task } from '@/@types/task'
import { Button, DatePicker, FormItem, Input, Select, Textarea, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { TaskFrequency, TaskPriority, TaskType, TaskTypeLabels, TaskPriorityLabels } from '@/enums/task.enum'
import { Form, Formik, FormikProps } from 'formik'
import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'

interface TaskFormData {
  name: string
  type: TaskType | null
  frequency: TaskFrequency | null
  priority: TaskPriority | null
  deadline: Date | null
  assignedUserIds: string[]
  note: string
  numberOfCampaigns?: number
  numberOfBackupCampaigns?: number
  dailyBudget?: number
  numberOfAccounts?: number
}

interface TaskFormProps {
  task?: Task | null
  isEdit?: boolean
  onSubmit: (values: TaskFormData) => void
  onCancel: () => void
  loading?: boolean
  onFormChange?: (changed: boolean) => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên công việc là bắt buộc'),
  type: Yup.string().required('Loại công việc là bắt buộc'),
  frequency: Yup.string().required('Tần suất là bắt buộc'),
  priority: Yup.string().required('Độ ưu tiên là bắt buộc'),
  deadline: Yup.date().required('Hạn chót là bắt buộc'),
  assignedUserIds: Yup.array().min(1, 'Phải chọn ít nhất một người được giao việc'),
})

export default function TaskForm({
  task,
  isEdit = false,
  onSubmit,
  onCancel,
  loading = false,
  onFormChange,
}: TaskFormProps) {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const formikRef = useRef<FormikProps<TaskFormData>>(null)

  const initialValues: TaskFormData = {
    name: task?.name || '',
    type: task?.type || null,
    frequency: task?.frequency || null,
    priority: task?.priority || null,
    deadline: task ? new Date(task.deadline) : null,
    assignedUserIds: task?.assignedUsers?.map((u) => u.id) || [],
    note: task?.note || '',
    numberOfCampaigns: task?.numberOfCampaigns || undefined,
    numberOfBackupCampaigns: task?.numberOfBackupCampaigns || undefined,
    dailyBudget: task?.dailyBudget || undefined,
    numberOfAccounts: task?.numberOfAccounts || undefined,
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

  useEffect(() => {
    if (formikRef.current && !task) {
      formikRef.current.resetForm()
      setSelectedUsers([])
    }
  }, [task])

  const typeOptions = Object.values(TaskType).map((type) => ({
    value: type,
    label: TaskTypeLabels[type],
  }))

  const frequencyOptions = Object.values(TaskFrequency).map((freq) => ({
    value: freq,
    label: freq === TaskFrequency.ONCE ? 'Một lần' : 'Hàng ngày',
  }))

  const priorityOptions = Object.values(TaskPriority).map((priority) => ({
    value: priority,
    label: TaskPriorityLabels[priority],
  }))

  return (
    <div className="task-form">
      <div className="mb-3">
        <h4 className="font-semibold text-gray-900 text-lg">{isEdit ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}</h4>
      </div>

      <Formik
        ref={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            assignedUserIds: selectedUsers.map((user) => user.value),
          })
        }}
      >
        {({ values, errors, touched, setFieldValue, handleChange, handleBlur, dirty }) => {
          // Đồng bộ assignedUserIds với selectedUsers khi form được khởi tạo
          useEffect(() => {
            if (selectedUsers.length > 0) {
              setFieldValue(
                'assignedUserIds',
                selectedUsers.map((user) => user.value),
              )
            }
          }, [selectedUsers, setFieldValue])

          // Theo dõi thay đổi form
          useEffect(() => {
            if (onFormChange) {
              onFormChange(dirty || selectedUsers.length !== (task?.assignedUsers?.length || 0))
            }
          }, [dirty, selectedUsers, task, onFormChange])

          return (
            <>
              <Form>
                <div className="px-2 max-h-[600px] overflow-y-auto">
                  <FormItem
                    label="Tên công việc"
                    invalid={touched.name && Boolean(errors.name)}
                    errorMessage={errors.name}
                  >
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Nhập tên công việc..."
                    />
                  </FormItem>
                  <div className="gap-4 grid grid-cols-2">
                    <FormItem
                      label="Loại công việc"
                      invalid={touched.type && Boolean(errors.type)}
                      errorMessage={errors.type}
                    >
                      <Select
                        name="type"
                        value={typeOptions.find((opt) => opt.value === values.type)}
                        onChange={(option: any) => setFieldValue('type', option?.value)}
                        options={typeOptions}
                        placeholder="Chọn loại công việc"
                      />
                    </FormItem>
                    <FormItem
                      label="Độ ưu tiên"
                      invalid={touched.priority && Boolean(errors.priority)}
                      errorMessage={errors.priority}
                    >
                      <Select
                        name="priority"
                        value={priorityOptions.find((opt) => opt.value === values.priority)}
                        onChange={(option: any) => setFieldValue('priority', option?.value)}
                        options={priorityOptions}
                        placeholder="Chọn độ ưu tiên"
                      />
                    </FormItem>
                  </div>

                  <div className="gap-4 grid grid-cols-2">
                    <FormItem
                      label="Tần suất"
                      invalid={touched.frequency && Boolean(errors.frequency)}
                      errorMessage={errors.frequency}
                    >
                      <Select
                        name="frequency"
                        value={frequencyOptions.find((opt) => opt.value === values.frequency)}
                        onChange={(option: any) => setFieldValue('frequency', option?.value)}
                        options={frequencyOptions}
                        placeholder="Chọn tần suất"
                      />
                    </FormItem>
                    <FormItem
                      label="Deadline"
                      invalid={touched.deadline && Boolean(errors.deadline)}
                      errorMessage={errors.deadline as string}
                    >
                      <DatePicker
                        value={values.deadline}
                        onChange={(date) => setFieldValue('deadline', date)}
                        placeholder="dd/MM/yyyy"
                        inputFormat="DD/MM/YYYY"
                      />
                    </FormItem>
                  </div>

                  <FormItem
                    label="Người được giao việc"
                    invalid={touched.assignedUserIds && Boolean(errors.assignedUserIds)}
                    errorMessage={errors.assignedUserIds as string}
                  >
                    <UserSelect
                      value={selectedUsers}
                      onChange={(users) => {
                        setSelectedUsers(users)
                        setFieldValue(
                          'assignedUserIds',
                          users.map((user: UserOption) => user.value),
                        )
                      }}
                      isMulti={true}
                      placeholder="Chọn người được giao việc..."
                    />
                  </FormItem>

                  {(values.type === TaskType.SET_CAMPAIGN || values.type === TaskType.LAUNCH_CAMPAIGN) && (
                    <div className="space-y-4 bg-gray-50 mb-3 px-4 pt-4 rounded-lg">
                      <h5>Thông tin chiến dịch</h5>

                      <div className="gap-4 grid grid-cols-2">
                        <FormItem label="Số lượng chiến dịch">
                          <Input
                            type="number"
                            name="numberOfCampaigns"
                            value={values.numberOfCampaigns || ''}
                            onChange={handleChange}
                            placeholder="Nhập số lượng..."
                          />
                        </FormItem>

                        <FormItem label="Chiến dịch dự phòng">
                          <Input
                            type="number"
                            name="numberOfBackupCampaigns"
                            value={values.numberOfBackupCampaigns || ''}
                            onChange={handleChange}
                            placeholder="Nhập số lượng..."
                          />
                        </FormItem>
                      </div>

                      <div className="gap-4 grid grid-cols-2">
                        <FormItem label="Ngân sách hàng ngày">
                          <Input
                            type="number"
                            name="dailyBudget"
                            value={values.dailyBudget || ''}
                            onChange={handleChange}
                            placeholder="Nhập ngân sách..."
                          />
                        </FormItem>

                        <FormItem label="Số lượng tài khoản">
                          <Input
                            type="number"
                            name="numberOfAccounts"
                            value={values.numberOfAccounts || ''}
                            onChange={handleChange}
                            placeholder="Nhập số lượng..."
                          />
                        </FormItem>
                      </div>
                    </div>
                  )}

                  <FormItem label="Ghi chú">
                    <Textarea
                      name="note"
                      value={values.note}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Nhập ghi chú..."
                      rows={3}
                    />
                  </FormItem>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                  <Button variant="plain" onClick={onCancel} size="sm">
                    Hủy
                  </Button>
                  <Button variant="solid" type="submit" loading={loading} size="sm">
                    {isEdit ? 'Cập nhật' : 'Tạo mới'}
                  </Button>
                </div>
              </Form>
            </>
          )
        }}
      </Formik>
    </div>
  )
}
