import { Badge } from '@/components/ui'
import { Role, getRoleColor, getRoleLabel } from '@/enums/role.enum'

interface UserRoleBadgesProps {
  roles: Role[]
  maxDisplay?: number
}

export default function UserRoleBadges({
  roles,
  maxDisplay = 2,
}: UserRoleBadgesProps) {
  const displayRoles = roles.slice(0, maxDisplay)
  const remainingCount = roles.length - maxDisplay

  return (
    <div className="flex flex-wrap items-center gap-2">
      {displayRoles.map((role) => (
        <Badge
          key={role}
          className={getRoleColor(role)}
          content={getRoleLabel(role)}
        />
      ))}
      {remainingCount > 0 && (
        <Badge className="bg-gray-400" content={`+${remainingCount}`} />
      )}
    </div>
  )
}
