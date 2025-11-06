import { Button, DatePicker, FormContainer, FormItem, Input, Select, Textarea } from '@/components/ui'
import { ProjectStatus, ProjectStatusLabels, ProjectType, ProjectTypeLabels } from '@/enums/project.enum'
import { CreateProjectRequest, UpdateProjectRequest } from '@/views/projects/types'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/views/projects/hooks/useProjectsQueries'
import FormCurrencyInput from '@/components/shared/FormCurrencyInput'
import TagInput from '@/components/shared/TagInput'
import NumberInput from '@/components/shared/NumberInput'
import { SelectOption } from '@/@types/common'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên dự án là bắt buộc'),
  type: Yup.string().required('Loại dự án là bắt buộc'),
})

type ProjectFormProps = {
  onClose: () => void
}

const gendersOptions: SelectOption[] = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'both', label: 'Nam và Nữ' },
]

const typeOptions = Object.values(ProjectType).map((type) => ({
  value: type,
  label: ProjectTypeLabels[type],
}))

const statusOptions = Object.values(ProjectStatus).map((status) => ({
  value: status,
  label: ProjectStatusLabels[status],
}))

export default function ProjectForm({ onClose }: ProjectFormProps) {
  const { selectedProject } = useProjectStore()
  const isEdit = !!selectedProject

  const createMutation = useCreateProjectMutation()
  const updateMutation = useUpdateProjectMutation()

  const initialValues: CreateProjectRequest | UpdateProjectRequest = {
    name: selectedProject?.name || '',
    type: (selectedProject?.type as ProjectType) || ProjectType.SET_CAMPAIGN,
    status: (selectedProject?.status as ProjectStatus) || ProjectStatus.RUNNING,
    totalBudget: selectedProject?.totalBudget || 0,
    exclusiveKeywords: selectedProject?.exclusiveKeywords || [],
    rejectedKeywords: selectedProject?.rejectedKeywords || [],
    targetCountries: selectedProject?.targetCountries || [],
    rejectedCountries: selectedProject?.rejectedCountries || [],
    devices: selectedProject?.devices || [],
    age: selectedProject?.age || null,
    gender: selectedProject?.gender || '',
    title: selectedProject?.title || '',
    description: selectedProject?.description || '',
    note: selectedProject?.note || '',
    content: selectedProject?.content || '',
    domainStatus: selectedProject?.domainStatus || '',
    originalDomain: selectedProject?.originalDomain || '',
    originalLadipage: selectedProject?.originalLadipage || '',
    finalURL: selectedProject?.finalURL || '',
    trackingURL: selectedProject?.trackingURL || '',
    deadline: selectedProject?.deadline ? new Date(selectedProject.deadline) : null,
    startedAt: selectedProject?.startedAt ? new Date(selectedProject.startedAt) : null,
  }

  const handleSubmit = async (values: CreateProjectRequest | UpdateProjectRequest) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        projectId: selectedProject.id,
        payload: values as UpdateProjectRequest,
      })
    } else {
      await createMutation.mutateAsync(values as CreateProjectRequest)
    }

    onClose()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <FormContainer>
            <FormItem asterisk label="Tên dự án" invalid={errors.name && touched.name} errorMessage={errors.name}>
              <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên dự án..." component={Input} />
            </FormItem>

            <div className="gap-4 grid grid-cols-2">
              <FormItem asterisk label="Loại dự án" invalid={errors.type && touched.type} errorMessage={errors.type}>
                <Select
                  name="type"
                  value={typeOptions.find((opt) => opt.value === values.type)}
                  options={typeOptions}
                  placeholder="Chọn loại dự án"
                  onChange={(option: any) => setFieldValue('type', option?.value)}
                />
              </FormItem>

              <FormItem
                asterisk
                label="Trạng thái"
                invalid={errors.status && touched.status}
                errorMessage={errors.status as string}
              >
                <Select
                  name="status"
                  value={statusOptions.find((opt) => opt.value === values.status)}
                  options={statusOptions}
                  placeholder="Chọn trạng thái"
                  onChange={(option: any) => setFieldValue('status', option?.value)}
                />
              </FormItem>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <FormItem label="Tổng ngân sách">
                <Field name="totalBudget">
                  {({ field, form }: any) => (
                    <FormCurrencyInput form={form} field={field} placeholder="Nhập tổng ngân sách" />
                  )}
                </Field>
              </FormItem>

              <FormItem label="Tiêu đề">
                <Field
                  type="text"
                  name="title"
                  placeholder="Nhập tiêu đề..."
                  component={Input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('title', e.target.value)}
                />
              </FormItem>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <FormItem label="Mô tả">
                <Field
                  name="description"
                  placeholder="Nhập mô tả dự án..."
                  component={Textarea}
                  rows={3}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue('description', e.target.value)}
                />
              </FormItem>

              <FormItem label="Ghi chú">
                <Field
                  name="note"
                  placeholder="Nhập ghi chú..."
                  component={Textarea}
                  rows={2}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue('note', e.target.value)}
                />
              </FormItem>
            </div>

            <FormItem label="Nội dung">
              <Field
                name="content"
                placeholder="Nhập nội dung..."
                component={Textarea}
                rows={3}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue('content', e.target.value)}
              />
            </FormItem>

            <div className="gap-4 grid grid-cols-3">
              <FormItem label="Ngày bắt đầu">
                <DatePicker
                  value={values.startedAt}
                  placeholder="dd/mm/yyyy"
                  inputFormat="DD/MM/YYYY"
                  onChange={(date) => setFieldValue('startedAt', date)}
                />
              </FormItem>

              <FormItem label="Deadline">
                <DatePicker
                  value={values.deadline}
                  placeholder="dd/mm/yyyy"
                  inputFormat="DD/MM/YYYY"
                  onChange={(date) => setFieldValue('deadline', date)}
                />
              </FormItem>

              <FormItem label="Tình trạng domain">
                <Field
                  name="domainStatus"
                  placeholder="Nhập tình trạng domain..."
                  component={Input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('domainStatus', e.target.value)}
                />
              </FormItem>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <FormItem label="Domain gốc">
                <Field
                  name="originalDomain"
                  placeholder="Nhập domain gốc..."
                  component={Input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('originalDomain', e.target.value)}
                />
              </FormItem>

              <FormItem label="Ladipage">
                <Field
                  name="originalLadipage"
                  placeholder="Nhập link ladipage..."
                  component={Input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('originalLadipage', e.target.value)
                  }
                />
              </FormItem>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <FormItem label="URL cuối cùng">
                <Field
                  name="finalURL"
                  placeholder="Nhập URL cuối cùng..."
                  component={Input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('finalURL', e.target.value)}
                />
              </FormItem>

              <FormItem label="URL theo dõi">
                <Field
                  name="trackingURL"
                  placeholder="Nhập URL theo dõi..."
                  component={Input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('trackingURL', e.target.value)}
                />
              </FormItem>
            </div>

            <div className="gap-x-4 grid grid-cols-2">
              <FormItem label="Từ khóa độc quyền">
                <TagInput
                  value={values.exclusiveKeywords || []}
                  placeholder="Nhập từ khóa..."
                  onChange={(tags) => setFieldValue('exclusiveKeywords', tags)}
                />
              </FormItem>

              <FormItem label="Từ khóa bị hạn chế">
                <TagInput
                  value={values.rejectedKeywords || []}
                  placeholder="Nhập từ khóa..."
                  onChange={(tags) => setFieldValue('rejectedKeywords', tags)}
                />
              </FormItem>

              <FormItem label="Quốc gia">
                <TagInput
                  value={values.targetCountries || []}
                  placeholder="Nhập quốc gia..."
                  onChange={(tags) => setFieldValue('targetCountries', tags)}
                />
              </FormItem>

              <FormItem label="Quốc gia bị hạn chế">
                <TagInput
                  value={values.rejectedCountries || []}
                  placeholder="Nhập quốc gia..."
                  onChange={(tags) => setFieldValue('rejectedCountries', tags)}
                />
              </FormItem>

              <FormItem label="Thiết bị">
                <TagInput
                  value={values.devices || []}
                  placeholder="Nhập thiết bị..."
                  onChange={(tags) => setFieldValue('devices', tags)}
                />
              </FormItem>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <FormItem label="Độ tuổi">
                <NumberInput
                  value={values.age}
                  min={1}
                  max={100}
                  placeholder="Nhập độ tuổi"
                  onChange={(value) => setFieldValue('age', value)}
                />
              </FormItem>

              <FormItem label="Giới tính">
                <Select
                  options={gendersOptions}
                  value={gendersOptions.find((opt) => opt.value === values.gender)}
                  placeholder="Chọn giới tính..."
                  onChange={(option: SelectOption | null) => setFieldValue('gender', option?.value)}
                />
              </FormItem>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" disabled={isSubmitting} onClick={onClose}>
                Hủy
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}
