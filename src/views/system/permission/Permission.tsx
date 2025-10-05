import { AdaptableCard } from '@/components/shared'
import { Container } from '@/components/shared'
import PermissionTable from '@/views/system/permission/components/PermissionTable'

const Permission = () => {
  return (
    <>
      <Container className="h-full">
        <AdaptableCard className="h-full" bodyClass="h-full">
          <PermissionTable />
        </AdaptableCard>
      </Container>
    </>
  )
}

export default Permission
