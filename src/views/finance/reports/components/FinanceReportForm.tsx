import { useState } from 'react'
import { ProjectDailyStat } from '@/views/finance/reports/types/ProjectDailyStat.type'
import FinanceReportFormStep1 from './FinanceReportFormStep1'
import FinanceReportFormStep2, { ManualInputData } from './FinanceReportFormStep2'
import { useUpdateProjectDailyStatMutation } from '@/views/finance/reports/hooks/useProjectDailyStat'

type Props = {
  onClose: () => void
}

export default function FinanceReportForm({ onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1)
  const [generatedData, setGeneratedData] = useState<ProjectDailyStat | null>(null)

  const updateProjectDailyStatMutation = useUpdateProjectDailyStatMutation()

  const handleStep1Success = (data: ProjectDailyStat) => {
    setGeneratedData(data)
    setStep(2)
  }

  const handleStep2Submit = async (values: ManualInputData) => {
    const { id, ...generatedDataWithoutId } = generatedData!

    const payload = {
      ...generatedDataWithoutId,
      ...values,
    }

    await updateProjectDailyStatMutation.mutateAsync({ id, payload })

    onClose()
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <>
      {step === 1 && <FinanceReportFormStep1 onSuccess={handleStep1Success} onCancel={onClose} />}
      {step === 2 && generatedData && (
        <FinanceReportFormStep2
          generatedData={generatedData}
          onSubmit={handleStep2Submit}
          onCancel={onClose}
          onBack={handleBack}
        />
      )}
    </>
  )
}
