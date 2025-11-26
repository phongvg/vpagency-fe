import FormCustomFormatInput from '@/components/shared/FormCustomFormatInput'
import type { FieldInputProps } from 'formik'
import type { ReactNode } from 'react'

interface FormCurrencyInputProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form: any
  field: FieldInputProps<unknown>
  inputSuffix?: string | ReactNode
  inputPrefix?: string | ReactNode
  thousandSeparator?: string
  decimalSeparator?: string
  decimalScale?: number
  placeholder?: string
  disabled?: boolean
  className?: string
  [key: string]: any
}

const FormCurrencyInput = ({
  form,
  field,
  inputSuffix = 'USD',
  inputPrefix,
  thousandSeparator = ',',
  decimalSeparator = '.',
  decimalScale = 0,
  ...rest
}: FormCurrencyInputProps) => {
  const formatCurrency = (value: string) => {
    if (!value) return ''

    const cleanValue = value.replace(/[^\d.]/g, '')

    const parts = cleanValue.split('.')
    let integerPart = parts[0]
    const decimalPart = parts[1]

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

    if (decimalScale > 0 && decimalPart !== undefined) {
      return `${integerPart}${decimalSeparator}${decimalPart.slice(0, decimalScale)}`
    }

    return integerPart
  }

  const removeCurrencyFormatting = (value: string) => {
    return value.replace(new RegExp(`[${thousandSeparator}${decimalSeparator}]`, 'g'), (match) => {
      return match === decimalSeparator ? '.' : ''
    })
  }

  const currentValue = field.value !== undefined && field.value !== null ? String(field.value) : ''

  return (
    <FormCustomFormatInput
      form={form}
      field={field}
      value={currentValue}
      format={formatCurrency}
      removeFormatting={removeCurrencyFormatting}
      inputSuffix={inputSuffix}
      inputPrefix={inputPrefix}
      onValueChange={(values) => {
        const numericValue = decimalScale > 0 ? values.floatValue : Math.floor(values.floatValue || 0)
        form.setFieldValue(field.name, numericValue || 0)
      }}
      {...rest}
    />
  )
}

export default FormCurrencyInput
