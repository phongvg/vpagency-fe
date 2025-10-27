import { Project } from '@/@types/project'
import { DatePicker, FormContainer, FormItem, Input, Select, Textarea, UserSelect } from '@/components/ui'
import { ProjectStatus, ProjectStatusLabels, ProjectType, ProjectTypeLabels } from '@/enums/project.enum'
import { CreateProjectRequest, UpdateProjectRequest } from '@/views/systems/projects/types'
import { Field, Form, Formik, FormikProps } from 'formik'
import { forwardRef, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { User } from '@/@types/user'
import { UserOption } from '@/components/ui/UserSelect/UserSelect'

interface ProjectEditFormProps {
  project: Project | null
  onFormSubmit: (values: CreateProjectRequest | UpdateProjectRequest) => void
}

export type FormikRef = FormikProps<CreateProjectRequest | UpdateProjectRequest>

const projectValidationSchema = Yup.object().shape({
  name: Yup.string().required('Tên dự án là bắt buộc'),
  type: Yup.string().required('Loại dự án là bắt buộc'),
})

const ProjectEditForm = forwardRef<FormikRef, ProjectEditFormProps>((props, ref) => {
  const { project, onFormSubmit } = props
  const [selectedOwner, setSelectedOwner] = useState<{ value: string; label: string; user: User } | null>(null)

  useEffect(() => {
    if (project?.owner) {
      setSelectedOwner({
        value: project.owner.id,
        label: `${project.owner.firstName || ''} ${project.owner.lastName || ''} (${project.owner.username})`.trim(),
        user: project.owner as User,
      })
    } else {
      setSelectedOwner(null)
    }
  }, [project])

  const typeOptions = Object.values(ProjectType).map((type) => ({
    value: type,
    label: ProjectTypeLabels[type],
  }))

  const statusOptions = Object.values(ProjectStatus).map((status) => ({
    value: status,
    label: ProjectStatusLabels[status],
  }))

  return (
    <Formik<CreateProjectRequest | UpdateProjectRequest>
      innerRef={ref}
      initialValues={{
        name: project?.name || '',
        type: (project?.type as ProjectType) || ProjectType.SET_CAMPAIGN,
        status: (project?.status as ProjectStatus) || ProjectStatus.RUNNING,
        ownerId: project?.ownerId,
        totalBudget: project?.totalBudget || 0,
        spentBudget: project?.spentBudget || 0,
        cpc: project?.cpc || 0,
        exclusiveKeywords: project?.exclusiveKeywords || [],
        rejectedKeywords: project?.rejectedKeywords || [],
        targetCountries: project?.targetCountries || [],
        rejectedCountries: project?.rejectedCountries || [],
        devices: project?.devices || [],
        ageRanges: project?.ageRanges || [],
        genders: project?.genders || [],
        title: project?.title || '',
        description: project?.description || '',
        note: project?.note || '',
        deadline: project?.deadline ? new Date(project.deadline) : null,
      }}
      enableReinitialize
      validationSchema={projectValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const submitValues = {
          ...values,
          ownerId: selectedOwner?.value,
        }
        onFormSubmit?.(submitValues)
        setSubmitting(false)
      }}
    >
      {({ touched, errors, values, setFieldValue }) => (
        <div className="p-6">
          <Form>
            <FormContainer>
              <h5 className="mb-4">{project ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}</h5>

              <FormItem label="Tên dự án (*)" invalid={errors.name && touched.name} errorMessage={errors.name}>
                <Field type="text" autoComplete="off" name="name" placeholder="Nhập tên dự án..." component={Input} />
              </FormItem>

              <div className="gap-4 grid grid-cols-2">
                <FormItem label="Loại dự án (*)" invalid={errors.type && touched.type} errorMessage={errors.type}>
                  <Select
                    name="type"
                    value={typeOptions.find((opt) => opt.value === values.type)}
                    onChange={(option: any) => setFieldValue('type', option?.value)}
                    options={typeOptions}
                    placeholder="Chọn loại dự án"
                  />
                </FormItem>

                <FormItem
                  label="Trạng thái"
                  invalid={errors.status && touched.status}
                  errorMessage={errors.status as string}
                >
                  <Select
                    name="status"
                    value={statusOptions.find((opt) => opt.value === values.status)}
                    onChange={(option: any) => setFieldValue('status', option?.value)}
                    options={statusOptions}
                    placeholder="Chọn trạng thái"
                  />
                </FormItem>
              </div>

              <FormItem label="Chủ sở hữu">
                <UserSelect
                  value={selectedOwner ? [selectedOwner] : []}
                  onChange={(users) => {
                    const user = users[0] || null
                    setSelectedOwner(user)
                    setFieldValue('ownerId', user?.value)
                  }}
                  isMulti={false}
                  placeholder="Chọn chủ sở hữu (mặc định là người tạo)"
                  isClearable
                />
              </FormItem>

              <div className="gap-4 grid grid-cols-3">
                <FormItem label="Tổng ngân sách">
                  <Field
                    type="number"
                    name="totalBudget"
                    placeholder="0"
                    component={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('totalBudget', parseFloat(e.target.value) || 0)
                    }
                  />
                </FormItem>

                <FormItem label="Đã chi tiêu">
                  <Field
                    type="number"
                    name="spentBudget"
                    placeholder="0"
                    component={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('spentBudget', parseFloat(e.target.value) || 0)
                    }
                  />
                </FormItem>

                <FormItem label="CPC">
                  <Field
                    type="number"
                    name="cpc"
                    placeholder="0"
                    component={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('cpc', parseFloat(e.target.value) || 0)
                    }
                  />
                </FormItem>
              </div>

              <FormItem label="Tiêu đề">
                <Field type="text" name="title" placeholder="Nhập tiêu đề..." component={Input} />
              </FormItem>

              <FormItem label="Deadline">
                <DatePicker
                  value={values.deadline}
                  onChange={(date) => setFieldValue('deadline', date)}
                  placeholder="Chọn ngày deadline"
                  inputFormat="DD/MM/YYYY"
                />
              </FormItem>

              <FormItem label="Mô tả">
                <Field name="description" placeholder="Nhập mô tả dự án..." component={Textarea} rows={3} />
              </FormItem>

              <FormItem label="Ghi chú">
                <Field name="note" placeholder="Nhập ghi chú..." component={Textarea} rows={2} />
              </FormItem>
            </FormContainer>
          </Form>
        </div>
      )}
    </Formik>
  )
})

ProjectEditForm.displayName = 'ProjectEditForm'

export default ProjectEditForm
