import { Task } from '@/@types/task'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { Button, DatePicker, FormItem, Input, Select, Textarea, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { TaskFrequency, TaskPriority, TaskPriorityLabels, TaskType, TaskTypeLabels } from '@/enums/task.enum'
import { setDeadlineTo1800 } from '@/helpers/date'
import { apiGetAdsGroupList } from '@/services/AdsGroupService'
import { apiGetFinalUrlList } from '@/views/finalUrls/services/FinalUrlService'
import { apiGetProjectList } from '@/views/projects/services/ProjectService'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'

interface TaskFormData {
  name: string
  type: TaskType | null
  frequency: TaskFrequency | null
  priority: TaskPriority | null
  deadline: Date | null
  assignedUserIds: string[]
  projectId: string | null
  adsGroupId: string | null
  note: string
  numberOfCampaigns?: number
  numberOfBackupCampaigns?: number
  dailyBudget?: number
  numberOfAccounts?: number
  numberOfResultCampaigns?: number
  finalUrlId: string
}

interface TaskFormProps {
  task?: Task | null
  isEdit?: boolean
  loading?: boolean
  onSubmit: (values: TaskFormData) => void
  onCancel: () => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên công việc là bắt buộc'),
  type: Yup.string().required('Loại công việc là bắt buộc'),
  frequency: Yup.string().required('Tần suất là bắt buộc'),
  priority: Yup.string().required('Độ ưu tiên là bắt buộc'),
  deadline: Yup.date().required('Deadline là bắt buộc'),
  assignedUserIds: Yup.array().min(1, 'Phải chọn ít nhất một người nhận việc'),
})

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

export default function TaskForm({ task, isEdit = false, loading = false, onSubmit, onCancel }: TaskFormProps) {
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([])

  const formikRef = useRef<FormikProps<TaskFormData>>(null)

  const initialValues: TaskFormData = {
    name: task?.name || '',
    type: task?.type || null,
    frequency: task?.frequency || null,
    priority: task?.priority || null,
    deadline: task?.deadline ? new Date(task.deadline) : null,
    assignedUserIds: task?.assignedUsers?.map((u) => u.id) || [],
    projectId: task?.project?.id || null,
    adsGroupId: task?.adsGroup?.id || null,
    note: task?.note || '',
    numberOfCampaigns: task?.numberOfCampaigns || undefined,
    numberOfBackupCampaigns: task?.numberOfBackupCampaigns || undefined,
    dailyBudget: task?.dailyBudget || undefined,
    numberOfAccounts: task?.numberOfAccounts || undefined,
    numberOfResultCampaigns: task?.numberOfResultCampaigns || undefined,
    finalUrlId: '',
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

  const fetchProjectOptions = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetProjectList({ search: search || '', page, limit })
      const { items, meta } = response.data.data
      return {
        data: items,
        total: meta.total,
        hasMore: meta.hasNext,
      }
    } catch {
      return { data: [], total: 0, hasMore: false }
    }
  }

  const fetchAdsGroupOptions = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetAdsGroupList({ search: search || '', page, limit })
      const { items, meta } = response.data.data
      return {
        data: items,
        total: meta.total,
        hasMore: meta.hasNext,
      }
    } catch {
      return { data: [], total: 0, hasMore: false }
    }
  }

  const fetchFinalUrlOptions = async ({ page, limit, search }: SelectParams) => {
    try {
      const response = await apiGetFinalUrlList({ search: search || '', page, limit })
      const { items, meta } = response.data.data
      return {
        data: items,
        total: meta.total,
        hasMore: meta.hasNext,
      }
    } catch {
      return { data: [], total: 0, hasMore: false }
    }
  }

  return (
    <div className="task-form">
      <div className="mb-3">
        <h4 className="font-semibold text-gray-900 text-lg">{isEdit ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}</h4>
      </div>

      <Formik
        innerRef={formikRef}
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
        {({ values, errors, touched, setFieldValue, handleChange, handleBlur }) => {
          return (
            <Form>
              <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
                <FormItem
                  asterisk
                  errorMessage={errors.name}
                  invalid={touched.name && Boolean(errors.name)}
                  label="Tên công việc"
                  className="col-span-2"
                >
                  <Input
                    name="name"
                    placeholder="Nhập tên công việc..."
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  errorMessage={errors.type}
                  invalid={touched.type && Boolean(errors.type)}
                  label="Loại công việc"
                >
                  <Select
                    name="type"
                    options={typeOptions}
                    placeholder="Chọn loại công việc"
                    value={typeOptions.find((opt) => opt.value === values.type)}
                    onChange={(option: { value: TaskType; label: string } | null) =>
                      setFieldValue('type', option?.value || null)
                    }
                  />
                </FormItem>

                <FormItem
                  asterisk
                  errorMessage={errors.priority}
                  invalid={touched.priority && Boolean(errors.priority)}
                  label="Độ ưu tiên"
                >
                  <Select
                    name="priority"
                    options={priorityOptions}
                    placeholder="Chọn độ ưu tiên"
                    value={priorityOptions.find((opt) => opt.value === values.priority)}
                    onChange={(option: { value: TaskPriority; label: string } | null) =>
                      setFieldValue('priority', option?.value || null)
                    }
                  />
                </FormItem>

                <FormItem
                  asterisk
                  errorMessage={errors.frequency}
                  invalid={touched.frequency && Boolean(errors.frequency)}
                  label="Tần suất"
                >
                  <Select
                    name="frequency"
                    options={frequencyOptions}
                    placeholder="Chọn tần suất"
                    value={frequencyOptions.find((opt) => opt.value === values.frequency)}
                    onChange={(option: { value: TaskFrequency; label: string } | null) =>
                      setFieldValue('frequency', option?.value || null)
                    }
                  />
                </FormItem>

                <FormItem
                  asterisk
                  errorMessage={errors.deadline as string}
                  invalid={touched.deadline && Boolean(errors.deadline)}
                  label="Deadline"
                >
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    minDate={new Date()}
                    placeholder="dd/MM/yyyy"
                    value={values.deadline}
                    onChange={(date) => setFieldValue('deadline', setDeadlineTo1800(date))}
                  />
                </FormItem>

                <FormItem label="Dự án">
                  <Field name="projectId">
                    {({ field, form }: FieldProps) => (
                      <SelectCustom
                        isCreatable
                        field={field}
                        form={form}
                        fetchOptions={fetchProjectOptions}
                        placeholder="Chọn dự án..."
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem label="Nhóm tài khoản Ads">
                  {/* <Select
                    cacheOptions
                    defaultOptions
                    componentAs={AsyncSelect}
                    loadOptions={fetchAdsGroupOptions}
                    placeholder="Chọn nhóm tài khoản..."
                    value={selectedAdsGroup}
                    onChange={(option: { value: string; label: string } | null) => {
                      setSelectedAdsGroup(option)
                      setFieldValue('adsGroupId', option?.value || null)
                    }}
                  /> */}
                  <Field name="adsGroupId">
                    {({ field, form }: FieldProps) => (
                      <SelectCustom
                        isCreatable
                        field={field}
                        form={form}
                        fetchOptions={fetchAdsGroupOptions}
                        placeholder="Chọn nhóm tài khoản..."
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  asterisk
                  errorMessage={errors.assignedUserIds as string}
                  invalid={touched.assignedUserIds && Boolean(errors.assignedUserIds)}
                  label="Người nhận việc"
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

                <FormItem label="Url cuối cùng">
                  <Field name="finalUrlId">
                    {({ field, form }: FieldProps) => (
                      <SelectCustom
                        isCreatable
                        field={field}
                        form={form}
                        fetchOptions={fetchFinalUrlOptions}
                        placeholder="Chọn URL cuối cùng..."
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem label="Ghi chú" className="col-span-2">
                  <Textarea
                    name="note"
                    placeholder="Nhập ghi chú..."
                    rows={3}
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>

                {values.type === TaskType.SET_CAMPAIGN && (
                  <div className="space-y-4 col-span-2 bg-gray-50 mb-3 px-4 py-4 rounded-lg">
                    <h5>Thông tin chi tiết</h5>

                    <div className="gap-x-4 grid grid-cols-1 lg:grid-cols-2">
                      <FormItem label="Số lượng campaign lên">
                        <Input
                          name="numberOfCampaigns"
                          placeholder="Nhập số lượng..."
                          type="number"
                          value={values.numberOfCampaigns || ''}
                          onChange={handleChange}
                        />
                      </FormItem>

                      <FormItem label="Số lượng kết quả campaign">
                        <Input
                          name="numberOfResultCampaigns"
                          placeholder="Nhập số lượng..."
                          type="number"
                          value={values.numberOfResultCampaigns || ''}
                          onChange={handleChange}
                        />
                      </FormItem>
                    </div>
                  </div>
                )}

                {values.type === TaskType.LAUNCH_CAMPAIGN && (
                  <div className="space-y-4 col-span-2 bg-gray-50 mb-3 px-4 py-4 rounded-lg">
                    <h5>Thông tin chi tiết</h5>

                    <div className="gap-x-4 grid grid-cols-1 lg:grid-cols-2">
                      <FormItem label="Ngân sách hàng ngày">
                        <Field name="dailyBudget">
                          {({ field, form }: FieldProps) => (
                            <FormCurrencyInput form={form} field={field} placeholder="Nhập ngân sách hàng ngày..." />
                          )}
                        </Field>
                      </FormItem>

                      <FormItem label="Số lượng tài khoản dự phòng">
                        <Input
                          name="numberOfBackupCampaigns"
                          placeholder="Nhập số lượng tài khoản dự phòng..."
                          type="number"
                          value={values.numberOfBackupCampaigns || ''}
                          onChange={handleChange}
                        />
                      </FormItem>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button size="sm" variant="plain" onClick={onCancel}>
                  Hủy
                </Button>
                <Button loading={loading} size="sm" type="submit" variant="solid">
                  {isEdit ? 'Cập nhật' : 'Tạo mới'}
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
