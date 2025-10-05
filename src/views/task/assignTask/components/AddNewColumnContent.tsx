import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Formik, Field, Form } from 'formik'
import requiredFieldValidation from '@/utils/requiredFieldValidation'
import {
  closeDialog,
  updateColumns,
  updateOrdered,
  useAppDispatch,
  useAppSelector,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'

const AddNewColumnContent = () => {
  const dispatch = useAppDispatch()

  const columns = useAppSelector((state) => state.scrumBoard.data.columns)
  const ordered = useAppSelector((state) => state.scrumBoard.data.ordered)

  const onFormSubmit = (title: string) => {
    const data = cloneDeep(columns)
    data[title ? title : 'Không có tiêu đề'] = []
    const newOrdered = [...ordered, ...[title ? title : 'Không có tiêu đề']]
    const newColumns: Record<string, unknown> = {}
    newOrdered.forEach((elm) => {
      newColumns[elm] = data[elm]
    })

    dispatch(updateColumns(newColumns))
    dispatch(updateOrdered(newOrdered))
    dispatch(closeDialog())
  }

  return (
    <div>
      <h5>Thêm mới cột</h5>
      <div className="mt-8">
        <Formik
          initialValues={{ title: '' }}
          onSubmit={({ title }) => onFormSubmit(title)}
        >
          {({ errors, touched }) => (
            <Form>
              <FormContainer layout="inline">
                <FormItem
                  label="Tên cột"
                  invalid={errors.title && touched.title}
                  errorMessage={errors.title}
                >
                  <Field
                    type="text"
                    name="title"
                    placeholder="Nhập tên cột"
                    component={Input}
                    validate={(value: string) =>
                      requiredFieldValidation(
                        value,
                        'Tên cột không được để trống',
                      )
                    }
                  />
                </FormItem>
                <FormItem>
                  <Button variant="solid" type="submit">
                    Thêm
                  </Button>
                </FormItem>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddNewColumnContent
