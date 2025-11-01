import { forwardRef } from 'react'
import { CreateProjectRequest, UpdateProjectRequest } from '@/views/projects/types'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import ProjectEditForm, { FormikRef } from '@/views/projects/components/ProjectEditForm'
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/views/projects/hooks/useProjectsQueries'

const ProjectEditContent = forwardRef<FormikRef>((_, ref) => {
  const { selectedProject } = useProjectStore()

  const createProjectMutation = useCreateProjectMutation()
  const updateProjectMutation = useUpdateProjectMutation()

  const handleSubmit = (values: CreateProjectRequest | UpdateProjectRequest) => {
    if (selectedProject) {
      updateProjectMutation.mutate({
        projectId: selectedProject.id,
        payload: values as UpdateProjectRequest,
      })
    } else {
      createProjectMutation.mutate(values as CreateProjectRequest)
    }
  }

  return <ProjectEditForm ref={ref} project={selectedProject} onFormSubmit={handleSubmit} />
})

ProjectEditContent.displayName = 'ProjectEditContent'

export type { FormikRef }

export default ProjectEditContent
