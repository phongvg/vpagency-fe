import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Dropdown from '@/components/ui/Dropdown'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import EllipsisButton from '@/components/shared/EllipsisButton'
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiXCircle,
  HiOutlineExclamation,
  HiOutlinePlusCircle,
  HiCheckCircle,
} from 'react-icons/hi'
import { Formik, Field, Form } from 'formik'
import {
  openDialog,
  updateDialogView,
  setSelectedBoard,
  updateColumns,
  updateOrdered,
  useAppDispatch,
  useAppSelector,
} from '../store'
import requiredFieldValidation from '@/utils/requiredFieldValidation'
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import type { Columns } from '../types'

type BoardTitleProps = {
  dragHandleProps?: DraggableProvidedDragHandleProps | null
  title: string
}

type RenameFormProps = {
  title: string
  closeRenameForm: () => void
  columns: Columns
  ordered: string[]
}

const RenameForm = ({
  title,
  closeRenameForm,
  columns,
  ordered,
}: RenameFormProps) => {
  const dispatch = useAppDispatch()

  const onFormSubmit = (newTitle: string) => {
    if (ordered.some((elm) => elm === newTitle)) {
      closeRenameForm()
      return
    }

    const newColumns = {}
    delete Object.assign(newColumns, columns, {
      [newTitle]: columns[title],
    })[title]

    const newOrder = ordered.map((elm) => {
      if (elm === title) {
        return newTitle
      }
      return elm
    })

    dispatch(updateColumns(newColumns))
    dispatch(updateOrdered(newOrder))
    closeRenameForm()
  }

  return (
    <Formik
      initialValues={{ title: title }}
      onSubmit={({ title }) => onFormSubmit(title)}
    >
      {({ errors, touched, submitForm }) => (
        <Form>
          <FormContainer layout="inline" size="sm">
            <FormItem className="mb-0" invalid={errors.title && touched.title}>
              <Field
                type="text"
                name="title"
                placeholder="Nhập tiêu đề cột"
                component={Input}
                validate={requiredFieldValidation}
                suffix={
                  <div className="flex items-center gap-2">
                    <HiCheckCircle
                      className="text-emerald-500 text-lg cursor-pointer"
                      onClick={submitForm}
                    />
                  </div>
                }
              />
            </FormItem>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}

const BoardTitle = (props: BoardTitleProps) => {
  const { dragHandleProps, title } = props

  const columns = useAppSelector((state) => state.scrumBoard.data.columns)
  const ordered = useAppSelector((state) => state.scrumBoard.data.ordered)

  const dispatch = useAppDispatch()

  const [renameActive, setRenameActive] = useState(false)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

  const onRenameActive = () => {
    setRenameActive(true)
  }

  const onRenameDeactivate = () => {
    setRenameActive(false)
  }

  const onConfirmDeleteClose = () => {
    setConfirmDeleteDialog(false)
  }

  const onBoardDelete = () => {
    setConfirmDeleteDialog(true)
  }

  const onAddNewTicket = () => {
    dispatch(openDialog())
    dispatch(updateDialogView('NEW_TICKET'))
    dispatch(setSelectedBoard(title))
  }

  const onDelete = () => {
    const newOrder = ordered.filter((elm) => elm !== title)
    const newColumns: Columns = {}
    Object.assign(newColumns, columns)
    delete newColumns[title]
    dispatch(updateColumns(newColumns))
    dispatch(updateOrdered(newOrder))
  }

  return (
    <div
      className="flex justify-between items-center px-4 py-3 board-title"
      {...dragHandleProps}
    >
      {renameActive ? (
        <>
          <RenameForm
            title={title}
            closeRenameForm={onRenameDeactivate}
            columns={columns}
            ordered={ordered}
          />
          <HiXCircle
            className="text-lg cursor-pointer"
            onClick={onRenameDeactivate}
          />
        </>
      ) : (
        <>
          <h6>{title}</h6>
          <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
            <Dropdown.Item eventKey="renameBoard" onClick={onRenameActive}>
              <span className="text-lg">
                <HiOutlinePencil />
              </span>
              <span className="rtl:mr-2 ml-2">Đổi tên</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="addTicket" onClick={onAddNewTicket}>
              <span className="text-lg">
                <HiOutlinePlusCircle />
              </span>
              <span className="rtl:mr-2 ml-2">Thêm công việc</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="deleteBoard" onClick={onBoardDelete}>
              <span className="text-lg">
                <HiOutlineTrash />
              </span>
              <span className="rtl:mr-2 ml-2">Xóa cột</span>
            </Dropdown.Item>
          </Dropdown>
        </>
      )}
      <Dialog
        isOpen={confirmDeleteDialog}
        contentClassName="pb-0 px-0 "
        onClose={onConfirmDeleteClose}
        onRequestClose={onConfirmDeleteClose}
      >
        <div className="flex px-6 pt-2 pb-6">
          <div>
            <Avatar
              className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-100"
              shape="circle"
            >
              <span className="text-2xl">
                <HiOutlineExclamation />
              </span>
            </Avatar>
          </div>
          <div className="rtl:mr-4 ml-4">
            <h5 className="mb-2">Xóa cột</h5>
            <p>
              Bạn có chắc chắn muốn xóa cột này không? Tất cả các công việc dưới
              cột này cũng sẽ bị xóa. Hành động này không thể hoàn tác.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-bl-lg rounded-br-lg text-right">
          <Button
            size="sm"
            className="ltr:mr-2 rtl:ml-2"
            onClick={onConfirmDeleteClose}
          >
            Hủy
          </Button>
          <Button size="sm" variant="solid" color="red-600" onClick={onDelete}>
            Xóa
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default BoardTitle
