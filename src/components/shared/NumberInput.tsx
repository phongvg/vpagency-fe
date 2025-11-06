import { useState, useEffect } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { Input } from '@/components/ui'

type NumberInputProps = {
  value?: number | null
  onChange: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  disabled?: boolean
}

export default function NumberInput({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  placeholder = '0',
  disabled = false,
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '')

  useEffect(() => {
    setInputValue(value?.toString() || '')
  }, [value])

  const handleIncrement = () => {
    const currentValue = value ?? 0
    const newValue = Math.min(currentValue + step, max)
    onChange(newValue)
  }

  const handleDecrement = () => {
    const currentValue = value ?? 0
    const newValue = Math.max(currentValue - step, min)
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value

    // Allow empty string
    if (inputVal === '') {
      setInputValue('')
      onChange(null)
      return
    }

    // Only allow numbers
    if (!/^\d+$/.test(inputVal)) {
      return
    }

    const numValue = parseInt(inputVal, 10)

    // Check bounds
    if (numValue < min || numValue > max) {
      return
    }

    setInputValue(inputVal)
    onChange(numValue)
  }

  const handleBlur = () => {
    // If empty on blur, reset to null
    if (inputValue === '') {
      onChange(null)
    }
  }

  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        disabled={disabled || (value !== null && value !== undefined && value <= min)}
        className="flex justify-center items-center bg-white hover:bg-gray-50 disabled:opacity-50 px-3 border border-gray-300 rounded-lg transition-colors disabled:cursor-not-allowed"
        onClick={handleDecrement}
      >
        <HiMinus className="w-4 h-4 text-gray-600" />
      </button>

      <Input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 text-center"
        onChange={handleInputChange}
        onBlur={handleBlur}
      />

      <button
        type="button"
        disabled={disabled || (value !== null && value !== undefined && value >= max)}
        className="flex justify-center items-center bg-white hover:bg-gray-50 disabled:opacity-50 px-3 border border-gray-300 rounded-lg transition-colors disabled:cursor-not-allowed"
        onClick={handleIncrement}
      >
        <HiPlus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  )
}
