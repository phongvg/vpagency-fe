import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import BoardAddNewColumn from './BoardAddNewColumn'
import QuickFilterTab from './QuickFilterTab'
import Container from '@/components/shared/Container'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import {
  getMembers,
  openDialog,
  updateDialogView,
  useAppDispatch,
  useAppSelector,
} from '../store'
import { HiOutlineUserAdd, HiOutlineCog } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const BoardHeader = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const boardMembers = useAppSelector(
    (state) => state.scrumBoard.data.boardMembers,
  )

  const onAddMember = () => {
    dispatch(updateDialogView('ADD_MEMBER'))
    dispatch(openDialog())
  }

  useEffect(() => {
    dispatch(getMembers())
  }, [dispatch])

  return (
    <div className="bg-white dark:bg-gray-800 pt-8 pb-4 border-gray-200 dark:border-gray-600 border-b">
      <Container className="px-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="mb-1">Danh sách công việc</p>
            <h3>RND Team Sprint 2</h3>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
          <QuickFilterTab />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              icon={<HiOutlineUserAdd />}
              onClick={onAddMember}
            />
            <BoardAddNewColumn />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default BoardHeader
