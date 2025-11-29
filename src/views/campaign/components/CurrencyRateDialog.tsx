import { Button, Dialog, Input } from '@/components/ui'
import { CurrencyRate, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'

type Props = {
  isOpen: boolean
  campaigns: UpdateCampaignRequest[]
  currencyRates: CurrencyRate[]
  isInvalidForm: boolean
  onChangeCurrencyRate: (rate: number, uid: string) => void
  onSubmit: () => void
  onClose: () => void
}

export default function CurrencyRateDialog({
  isOpen,
  campaigns,
  currencyRates,
  isInvalidForm,
  onChangeCurrencyRate,
  onSubmit,
  onClose,
}: Props) {
  const uniqueCodes = [
    ...new Map(currencyRates.map((i) => [i.code, { code: i.code, rateToUSD: i.rateToUSD }])).values(),
  ]

  return (
    <Dialog isOpen={isOpen} width={550} onClose={onClose} onRequestClose={onClose}>
      <h5 className="mb-4">Cập nhật tỷ giá quy đổi sang USD</h5>
      <div className="mb-6 space-y-3">
        {uniqueCodes.map((item) => (
          <div className="flex items-center gap-3" key={item.code}>
            <label htmlFor={item.code} className="form-label">
              {item.code}:
            </label>
            <Input
              type="number"
              id={item.code}
              value={item.rateToUSD || ''}
              onChange={(e) => onChangeCurrencyRate(Number(e.target.value), item.code)}
              min={0}
              placeholder="Nhập tỷ giá quy đổi sang USD"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" size="sm" onClick={onClose}>
          Hủy
        </Button>
        <Button type="button" size="sm" variant="solid" onClick={onSubmit} disabled={isInvalidForm}>
          Cập nhật
        </Button>
      </div>
    </Dialog>
  )
}
