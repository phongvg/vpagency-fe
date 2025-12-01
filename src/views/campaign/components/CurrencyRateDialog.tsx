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
      <div className="space-y-3 mb-6">
        {uniqueCodes.map((item) => (
          <div key={item.code} className="flex items-center gap-3">
            <label htmlFor={item.code} className="form-label">
              {item.code}:
            </label>
            <Input
              type="number"
              id={item.code}
              value={item.rateToUSD ?? ''}
              placeholder="Nhập tỷ giá quy đổi sang USD"
              onChange={(e) => onChangeCurrencyRate(Number(e.target.value), item.code)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" size="sm" onClick={onClose}>
          Hủy
        </Button>
        <Button type="button" size="sm" variant="solid" disabled={isInvalidForm} onClick={onSubmit}>
          Cập nhật
        </Button>
      </div>
    </Dialog>
  )
}
