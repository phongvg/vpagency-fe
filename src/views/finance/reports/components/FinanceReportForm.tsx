import { useState, useEffect } from 'react'
import { ProjectDailyStat, UpdateProjectDailyStatRequest } from '@/views/finance/reports/types/ProjectDailyStat.type'
import FinanceReportFormStep1 from './FinanceReportFormStep1'
import FinanceReportFormStep2, { ManualInputData } from './FinanceReportFormStep2'
import {
  useUpdateProjectDailyStatMutation,
  useGetProjectDailyStatById,
} from '@/views/finance/reports/hooks/useProjectDailyStat'
import { Loading } from '@/components/shared'

type Props = {
  onClose: () => void
  projectDailyStatId?: string | null
}

export default function FinanceReportForm({ onClose, projectDailyStatId }: Props) {
  const [step, setStep] = useState<1 | 2>(projectDailyStatId ? 2 : 1)
  const [generatedData, setGeneratedData] = useState<UpdateProjectDailyStatRequest | null>(null)

  const { data: existingData, isLoading } = useGetProjectDailyStatById(projectDailyStatId || null)
  const updateProjectDailyStatMutation = useUpdateProjectDailyStatMutation()

  useEffect(() => {
    if (existingData && projectDailyStatId) {
      setGeneratedData({
        projectId: existingData.projectId,
        date: existingData.date,
        totalClicks: existingData.totalClicks,
        totalCost: existingData.totalCost,
        totalTargetCpc: existingData.totalTargetCpc,
        activeCountries: existingData.activeCountries,
        createdAt: existingData.createdAt,
        totalRef: existingData.totalRef,
        costPerRef: existingData.costPerRef,
        rateRefPerClick: existingData.rateRefPerClick,
        totalFtd: existingData.totalFtd,
        costPerFtd: existingData.costPerFtd,
        costFtdPerRef: existingData.costFtdPerRef,
        totalTargetDailyKeyVolume: existingData.totalTargetDailyKeyVolume,
        totalTargetRef: existingData.totalTargetRef,
        totalClickPerVolume: existingData.totalClickPerVolume,
        totalRefPerVolume: existingData.totalRefPerVolume,
        receivedRevenue: existingData.receivedRevenue,
        holdRevenue: existingData.holdRevenue,
        profit: existingData.profit,
        roi: existingData.roi,
        id: existingData.id,
      })

      setStep(2)
    }
  }, [existingData, projectDailyStatId])

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

    await updateProjectDailyStatMutation.mutateAsync({ id: id!, payload })

    onClose()
  }

  const handleBack = () => {
    setStep(1)
  }

  if (isLoading && projectDailyStatId) {
    return <Loading loading={true} />
  }

  return (
    <>
      {step === 1 && <FinanceReportFormStep1 onSuccess={handleStep1Success} onCancel={onClose} />}
      {step === 2 && generatedData && (
        <FinanceReportFormStep2
          generatedData={generatedData}
          onSubmit={handleStep2Submit}
          onCancel={onClose}
          onBack={projectDailyStatId ? undefined : handleBack}
        />
      )}
    </>
  )
}
