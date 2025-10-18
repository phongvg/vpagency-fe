import { Input } from '@/components/ui'
import { InputProps } from '@/components/ui/Input'

interface TextareaProps extends Omit<InputProps, 'textArea'> {
  rows?: number
}

export default function Textarea({ rows = 3, ...props }: TextareaProps) {
  return <Input {...props} textArea rows={rows} />
}
