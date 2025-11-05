import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import Avatar from '@/components/ui/Avatar'
import acronym from '@/utils/acronym'
import type { AvatarProps, AvatarGroupProps } from '@/components/ui/Avatar'
import { User } from '@/@types/user'

interface UsersAvatarGroupProps extends AvatarGroupProps {
  avatarGroupProps?: AvatarGroupProps
  avatarProps?: AvatarProps
  imgKey?: string
  nameKey?: string
  onAvatarClick?: (avatar: User) => void
  users?: User[]
}

const UsersAvatarGroup = (props: UsersAvatarGroupProps) => {
  const { avatarGroupProps = {}, avatarProps = {}, onAvatarClick, users = [], ...rest } = props

  const defaultAvatarProps = useMemo(() => {
    return {
      shape: 'circle' as 'round' | 'circle' | 'square',
      size: 30,
      className: 'cursor-pointer',
      ...avatarProps,
    }
  }, [avatarProps])

  const handleAvatarClick = (avatar: User) => {
    onAvatarClick?.(avatar)
  }

  return (
    <Avatar.Group omittedAvatarTooltip chained omittedAvatarProps={defaultAvatarProps} {...avatarGroupProps} {...rest}>
      {users.map((elm) => (
        <Tooltip key={elm.id} title={`${elm.firstName} ${elm.lastName}`} placement="top">
          <Avatar {...defaultAvatarProps} src={elm.avatar ?? ''} onClick={() => handleAvatarClick(elm)}>
            {acronym(`${elm.firstName} ${elm.lastName}`)}
          </Avatar>
        </Tooltip>
      ))}
    </Avatar.Group>
  )
}

export default UsersAvatarGroup
