import { useState, KeyboardEvent } from 'react'
import { HiX } from 'react-icons/hi'
import { Input } from '@/components/ui'

type TagInputProps = {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
}

export default function TagInput({ value = [], onChange, placeholder, disabled = false }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmedValue = inputValue.trim()
      if (trimmedValue && !value.includes(trimmedValue)) {
        onChange([...value, trimmedValue])
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="p-2 border border-gray-300 focus-within:border-indigo-600 rounded-lg focus-within:ring-1 focus-within:ring-indigo-600 transition-all">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full font-medium text-indigo-800 text-sm"
            >
              <span>{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  className="top-[1px] relative flex justify-center items-center bg-gray-200 p-0.5 rounded-full transition-colors"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <HiX />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <Input
        type="text"
        value={inputValue}
        placeholder={value.length === 0 ? placeholder : ''}
        disabled={disabled}
        className="shadow-none p-0 border-none focus:ring-0"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
