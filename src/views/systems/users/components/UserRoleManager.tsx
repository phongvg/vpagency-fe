import { Switcher } from '@/components/ui'
import { Role, getRoleLabel, getAllRoles } from '@/enums/role.enum'
import { FieldProps } from 'formik'

interface UserRoleManagerProps {
  selectedRoles: Role[]
  onRoleChange: (roles: Role[]) => void
  disabled?: boolean
}

export default function UserRoleManagerField({
  field,
  form,
  ...props
}: FieldProps & { disabled?: boolean }) {
  const handleRoleChange = (roles: Role[]) => {
    form.setFieldValue(field.name, roles)
    form.setFieldTouched(field.name, true)
  }

  return (
    <UserRoleManager
      selectedRoles={field.value || []}
      disabled={props.disabled}
      onRoleChange={handleRoleChange}
    />
  )
}

function UserRoleManager({
  selectedRoles,
  onRoleChange,
  disabled = false,
}: UserRoleManagerProps) {
  const allRoles = getAllRoles()

  const handleRoleToggle = (role: Role) => {
    if (disabled) return

    const isCurrentlySelected = selectedRoles.includes(role)
    let newRoles: Role[]

    if (isCurrentlySelected) {
      newRoles = selectedRoles.filter((r) => r !== role)
    } else {
      newRoles = [...selectedRoles, role]
    }

    onRoleChange(newRoles)
  }

  return (
    <div className="space-y-3">
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b">
          <div className="gap-4 grid grid-cols-2">
            <span className="font-medium text-gray-600 text-sm">
              Trạng thái
            </span>
            <span className="font-medium text-gray-600 text-sm">Vai trò</span>
          </div>
        </div>

        <div className="divide-y">
          {allRoles.map((role) => {
            const isSelected = selectedRoles.includes(role)

            return (
              <div
                key={role}
                className="hover:bg-gray-50 px-4 py-3 transition-colors"
              >
                <div className="items-center gap-4 grid grid-cols-2">
                  <div>
                    <Switcher
                      checked={isSelected}
                      disabled={disabled}
                      onChange={() => handleRoleToggle(role)}
                    />
                  </div>
                  <div>
                    <span className="text-gray-900 text-sm">
                      {getRoleLabel(role)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedRoles.length > 0 && (
        <div className="bg-blue-50 mt-3 p-3 rounded-lg">
          <p className="text-blue-600 text-xs">
            Đã chọn {selectedRoles.length} vai trò:{' '}
            {[...new Set(selectedRoles)]
              .map((role) => getRoleLabel(role))
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}
