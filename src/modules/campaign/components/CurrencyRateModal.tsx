import type { CurrencyRate } from "@/modules/campaign/types/campaign.type";
import { AppButton } from "@/shared/components/common/AppButton";
import PriceInput from "@/shared/components/common/PriceInput/PriceInput";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface CurrencyRateModalProps {
  open: boolean;
  currencyRates: CurrencyRate[];
  isInvalidForm: boolean;
  onChangeCurrencyRate: (rate: number, uid: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function CurrencyRateModal({ open, currencyRates, isInvalidForm, onChangeCurrencyRate, onSubmit, onClose }: CurrencyRateModalProps) {
  const uniqueCodes = [...new Map(currencyRates.map((i) => [i.code, { code: i.code, rateToUSD: i.rateToUSD }])).values()];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật tỷ giá quy đổi sang USD</DialogTitle>
        </DialogHeader>

        <div className='space-y-3 mb-6'>
          {uniqueCodes.map((item) => (
            <div key={item.code} className='flex items-center gap-3'>
              <label htmlFor={item.code} className='text-white/50'>
                {item.code}:
              </label>

              <PriceInput
                id={item.code}
                value={item.rateToUSD ?? undefined}
                placeholder='Nhập tỷ giá quy đổi sang USD'
                onChange={(value) => onChangeCurrencyRate(Number(value), item.code)}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <AppButton variant='outline' onClick={onClose}>
            Đóng
          </AppButton>
          <AppButton variant='outline' disabled={isInvalidForm} onClick={onSubmit}>
            Xác nhận
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
