import SelectCustom, { SelectParams } from '@/components/shared/SelectCustom'
import { Button, Checkbox, DatePicker, FormItem, Input, Select, Textarea, UserSelect } from '@/components/ui'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'
import { TaskFrequency, TaskPriority, TaskType } from '@/enums/task.enum'
import { useCreateFinalUrlMutation, useGetFinalUrlsByProjectId } from '@/views/projects/hooks/useFinalUrl'
import { apiGetProjectList } from '@/views/projects/services/ProjectService'
import {
  frequencyOptions,
  priorityOptions,
  typeOptions,
} from '@/views/tasks/assign/constants/taskOptionSelect.constant'
import { Task, UpdateTaskRequest } from '@/views/tasks/assign/types/task.type'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import * as Yup from 'yup'

type Props = {
  task?: Task | null
  isEdit?: boolean
  loading?: boolean
  onSubmit: (values: UpdateTaskRequest) => void
  onCancel: () => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên công việc là bắt buộc'),
  type: Yup.string().required('Loại công việc là bắt buộc'),
  frequency: Yup.string().required('Tần suất là bắt buộc'),
  priority: Yup.string().required('Độ ưu tiên là bắt buộc'),
  deadline: Yup.date().required('Deadline là bắt buộc'),
  projectId: Yup.string().when('type', {
    is: (val: string) =>
      val === TaskType.SET_CAMPAIGN || val === TaskType.LAUNCH_CAMPAIGN || val === TaskType.NURTURE_ACCOUNT,
    then: (schema) => schema.required('Dự án là bắt buộc'),
    otherwise: (schema) => schema.nullable(),
  }),
  assignedUserIds: Yup.array().min(1, 'Phải chọn ít nhất một người nhận việc'),
  finalUrlIds: Yup.array().when('type', {
    is: (val: string) =>
      val === TaskType.SET_CAMPAIGN || val === TaskType.LAUNCH_CAMPAIGN || val === TaskType.NURTURE_ACCOUNT,
    then: (schema) => schema.min(1, 'Phải chọn ít nhất một URL'),
    otherwise: (schema) => schema,
  }),
})

export default function TaskForm({ task, isEdit = false, loading = false, onSubmit, onCancel }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedFinalUrlIds, setSelectedFinalUrlIds] = useState<string[]>([])
  const [isAddingUrl, setIsAddingUrl] = useState(false)
  const [newUrlName, setNewUrlName] = useState('')
  const [newUrlFinalURL, setNewUrlFinalURL] = useState('')

  const formikRef = useRef<FormikProps<UpdateTaskRequest>>(null)

  const { data: finalUrlsData, isLoading: isLoadingFinalUrls } = useGetFinalUrlsByProjectId(
    selectedProjectId || '',
    !!selectedProjectId,
  )

  const createFinalUrlMutation = useCreateFinalUrlMutation()

  const finalUrls = finalUrlsData?.items || []

  const initialValues: UpdateTaskRequest = {
    name: task?.name || '',
    type: task?.type || null,
    frequency: task?.frequency || null,
    priority: task?.priority || null,
    deadline: task?.deadline ? new Date(task.deadline) : null,
    assignedUserIds: task?.assignedUsers?.map((u) => u.id) || [],
    projectId: task?.project?.id || null,
    note: task?.note || '',
    numberOfCampaigns: task?.numberOfCampaigns || undefined,
    numberOfBackupCampaigns: task?.numberOfBackupCampaigns || undefined,
    dailyBudget: task?.dailyBudget || undefined,
    numberOfAccounts: task?.numberOfAccounts || undefined,
    numberOfResultCampaigns: task?.numberOfResultCampaigns || undefined,
    finalUrlIds: task?.finalUrlIds || [],
    numberOfSuspendedAccounts: task?.numberOfSuspendedAccounts || undefined,
    appealProject: task?.appealProject || undefined,
    numberOfAppealDocuments: task?.numberOfAppealDocuments || undefined,
    researchContent: task?.researchContent || undefined,
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

    if (task?.finalUrlIds) {
      setSelectedFinalUrlIds(task.finalUrlIds)
    } else {
      setSelectedFinalUrlIds([])
    }

    if (task?.project?.id) {
      setSelectedProjectId(task.project.id)
    } else {
      setSelectedProjectId(null)
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

  const handleCreateUrl = async () => {
    if (!selectedProjectId || !newUrlName || !newUrlFinalURL) return

    await createFinalUrlMutation.mutateAsync({
      projectId: selectedProjectId,
      name: newUrlName,
      finalURL: newUrlFinalURL,
    })

    setNewUrlName('')
    setNewUrlFinalURL('')
    setIsAddingUrl(false)
  }

  const handleCancelAddUrl = () => {
    setNewUrlName('')
    setNewUrlFinalURL('')
    setIsAddingUrl(false)
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
            finalUrlIds: selectedFinalUrlIds,
            assignedUserIds: selectedUsers.map((user) => user.value),
          })
        }}
      >
        {({ values, errors, touched, setFieldValue, handleChange }) => {
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
                  <Input name="name" placeholder="Nhập tên công việc..." value={values.name} onChange={handleChange} />
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
                    onChange={(date) => setFieldValue('deadline', date)}
                  />
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

                {[TaskType.SET_CAMPAIGN, TaskType.LAUNCH_CAMPAIGN, TaskType.NURTURE_ACCOUNT].includes(values.type!) && (
                  <FormItem
                    asterisk
                    label="Dự án"
                    errorMessage={errors.projectId}
                    invalid={touched.projectId && Boolean(errors.projectId)}
                  >
                    <Field name="projectId">
                      {({ field, form }: FieldProps) => (
                        <SelectCustom
                          isCreatable
                          field={field}
                          form={form}
                          fetchOptions={fetchProjectOptions}
                          placeholder="Chọn dự án..."
                          onChange={(value) => {
                            form.setFieldValue('projectId', value)
                            setSelectedProjectId(value as string | null)
                            setSelectedFinalUrlIds([])
                            form.setFieldValue('finalUrlIds', [])
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                )}

                {values.type !== TaskType.APPEAL_ACCOUNT && selectedProjectId && (
                  <div className="col-span-2 bg-gray-50 px-4 py-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-semibold text-gray-900">
                        Danh sách URL <span className="text-red-500">*</span>
                        {selectedFinalUrlIds.length > 0 && (
                          <span className="ml-2 text-sm">({selectedFinalUrlIds.length} đã chọn)</span>
                        )}
                      </h5>
                      {!isAddingUrl && (
                        <Button size="sm" variant="solid" icon={<HiOutlinePlus />} onClick={() => setIsAddingUrl(true)}>
                          Thêm URL
                        </Button>
                      )}
                    </div>
                    {touched.finalUrlIds && errors.finalUrlIds && (
                      <div className="mb-3 text-red-500 text-sm">{errors.finalUrlIds as string}</div>
                    )}

                    {isAddingUrl && (
                      <div className="bg-white mb-4 p-4 border border-gray-200 rounded-lg">
                        <h6 className="mb-3 font-semibold text-gray-900">Thêm URL mới</h6>
                        <div className="space-y-3">
                          <FormItem asterisk label="Tên">
                            <Input
                              placeholder="Nhập tên..."
                              value={newUrlName}
                              onChange={(e) => setNewUrlName(e.target.value)}
                            />
                          </FormItem>
                          <FormItem asterisk label="URL">
                            <Input
                              placeholder="https://example.com"
                              value={newUrlFinalURL}
                              onChange={(e) => setNewUrlFinalURL(e.target.value)}
                            />
                          </FormItem>
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="plain" onClick={handleCancelAddUrl}>
                              Hủy
                            </Button>
                            <Button
                              type="button"
                              disabled={!newUrlName || !newUrlFinalURL}
                              loading={createFinalUrlMutation.isPending}
                              size="sm"
                              variant="solid"
                              onClick={handleCreateUrl}
                            >
                              Lưu
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {isLoadingFinalUrls ? (
                      <div className="py-4 text-gray-500 text-center">Đang tải...</div>
                    ) : finalUrls.length > 0 ? (
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full align-middle">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 font-semibold text-gray-700 text-sm text-left">Chọn</th>
                              <th className="px-4 py-2 font-semibold text-gray-700 text-sm text-left">Tên</th>
                              <th className="px-4 py-2 font-semibold text-gray-700 text-sm text-left">URL</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {finalUrls.map((url) => {
                              const isChecked = selectedFinalUrlIds.includes(url.id)
                              return (
                                <tr
                                  key={url.id}
                                  className={`border-t cursor-pointer hover:bg-gray-50 ${
                                    isChecked ? 'bg-blue-50' : ''
                                  }`}
                                  onClick={() => {
                                    const newSelectedIds = isChecked
                                      ? selectedFinalUrlIds.filter((id) => id !== url.id)
                                      : [...selectedFinalUrlIds, url.id]
                                    setSelectedFinalUrlIds(newSelectedIds)
                                    setFieldValue('finalUrlIds', newSelectedIds)
                                  }}
                                >
                                  <td className="px-4 py-2">
                                    <div className="flex justify-start items-center">
                                      <Checkbox readOnly checked={isChecked} color="green-500" />
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 text-gray-900 text-sm">{url.name}</td>
                                  <td
                                    className="px-4 py-2 max-w-xs text-gray-600 text-sm truncate"
                                    title={url.finalURL}
                                  >
                                    <a
                                      href={url.finalURL}
                                      className="text-blue-700 hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {url.finalURL}
                                    </a>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-4 text-gray-500 text-center">Dự án này chưa có URL</div>
                    )}
                  </div>
                )}

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
                          min={0}
                          onChange={handleChange}
                        />
                      </FormItem>

                      <FormItem label="Số lượng kết quả campaign">
                        <Input
                          name="numberOfResultCampaigns"
                          placeholder="Nhập số lượng..."
                          type="number"
                          value={values.numberOfResultCampaigns || ''}
                          min={0}
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
                        <Input
                          name="dailyBudget"
                          placeholder="Nhập ngân sách hàng ngày..."
                          type="number"
                          value={values.dailyBudget || ''}
                          min={0}
                          onChange={handleChange}
                        />
                      </FormItem>

                      <FormItem label="Số lượng tài khoản dự phòng">
                        <Input
                          name="numberOfBackupCampaigns"
                          placeholder="Nhập số lượng tài khoản dự phòng..."
                          type="number"
                          value={values.numberOfBackupCampaigns || ''}
                          min={0}
                          onChange={handleChange}
                        />
                      </FormItem>
                    </div>
                  </div>
                )}

                {values.type === TaskType.APPEAL_ACCOUNT && (
                  <div className="space-y-4 col-span-2 bg-gray-50 mb-3 px-4 py-4 rounded-lg">
                    <h5>Thông tin chi tiết</h5>

                    <div className="gap-x-4 grid grid-cols-1 lg:grid-cols-2">
                      <FormItem label="Số lượng tài khoản tạm ngưng">
                        <Input
                          name="numberOfSuspendedAccounts"
                          placeholder="Nhập số lượng tài khoản tạm ngưng..."
                          type="number"
                          value={values.numberOfSuspendedAccounts || ''}
                          min={0}
                          onChange={handleChange}
                        />
                      </FormItem>
                    </div>
                  </div>
                )}

                {values.type === TaskType.DOCUMENT_APPEAL && (
                  <div className="space-y-4 col-span-2 bg-gray-50 mb-3 px-4 py-4 rounded-lg">
                    <h5>Thông tin chi tiết</h5>

                    <div className="gap-x-4 grid grid-cols-1 lg:grid-cols-2">
                      <FormItem label="Dự án cần kháng">
                        <Input
                          name="appealProject"
                          placeholder="Nhập dự án cần kháng..."
                          type="text"
                          value={values.appealProject || ''}
                          min={0}
                          onChange={handleChange}
                        />
                      </FormItem>

                      <FormItem label="Số lượng đơn kháng">
                        <Input
                          name="numberOfAppealDocuments"
                          placeholder="Nhập số lượng đơn kháng..."
                          type="number"
                          value={values.numberOfAppealDocuments || ''}
                          min={0}
                          onChange={handleChange}
                        />
                      </FormItem>
                    </div>
                  </div>
                )}

                {values.type === TaskType.RESEARCH && (
                  <div className="space-y-4 col-span-2 bg-gray-50 mb-3 px-4 py-4 rounded-lg">
                    <h5>Thông tin chi tiết</h5>

                    <FormItem label="Nội dung nghiên cứu" className="col-span-2">
                      <Textarea
                        name="researchContent"
                        placeholder="Nhập nội dung nghiên cứu..."
                        rows={4}
                        value={values.researchContent || ''}
                        onChange={handleChange}
                      />
                    </FormItem>
                  </div>
                )}
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
          )
        }}
      </Formik>
    </div>
  )
}
