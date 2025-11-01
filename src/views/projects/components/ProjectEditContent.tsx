import { forwardRef } from 'react'
import { CreateProjectRequest, UpdateProjectRequest } from '@/views/projects/types'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import ProjectEditForm, { FormikRef } from '@/views/projects/components/ProjectEditForm'
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/views/projects/hooks/useProjectsQueries'
import { toastError, toastSuccess } from '@/utils/toast'

const ProjectEditContent = forwardRef<FormikRef>((_, ref) => {
  const { selectedProject, setDrawerOpen } = useProjectStore()

  const createProjectMutation = useCreateProjectMutation()
  const updateProjectMutation = useUpdateProjectMutation()

  const handleSubmit = (values: CreateProjectRequest | UpdateProjectRequest) => {
    if (selectedProject) {
      // Update
      updateProjectMutation.mutate(
        {
          projectId: selectedProject.id,
          payload: values as UpdateProjectRequest,
        },
        {
          onSuccess: () => {
            toastSuccess('Cập nhật dự án thành công')
            setDrawerOpen(false)
          },
          onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Cập nhật dự án thất bại'
            toastError(errorMessage)
          },
        },
      )
    } else {
      // Create
      createProjectMutation.mutate(values as CreateProjectRequest, {
        onSuccess: () => {
          toastSuccess('Tạo dự án thành công')
          setDrawerOpen(false)
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || 'Tạo dự án thất bại'
          toastError(errorMessage)
        },
      })
    }
  }

  return <ProjectEditForm ref={ref} project={selectedProject} onFormSubmit={handleSubmit} />
})

ProjectEditContent.displayName = 'ProjectEditContent'

export type { FormikRef }

export default ProjectEditContent
