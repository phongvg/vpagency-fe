import { FormArrayInput } from "@/shared/components/form/FormArrayInput";
import { FormInput } from "@/shared/components/form/FormInput";
import { FormPriceInput } from "@/shared/components/form/FormPriceInput";

export default function ProjectFinalUrlForm() {
  return (
    <div className='gap-4 grid grid-cols-4'>
      <FormInput name='name' label='Tên URL' className='col-span-2' required />

      <FormInput name='finalURL' label='URL' className='col-span-2' required />

      <FormArrayInput name='countriesTier1' label='Quốc gia hạng 1' />

      <FormArrayInput name='countriesTier2' label='Quốc gia hạng 2' />

      <FormArrayInput name='countriesTier3' label='Quốc gia hạng 3' />

      <FormArrayInput name='excludeCountries' label='Quốc gia loại trừ' />

      <FormInput name='title' label='Tiêu đề' className='col-span-2' />

      <FormInput name='content' label='Nội dung' className='col-span-2' />

      <FormInput name='targetRef' label='Mục tiêu Ref' type='number' />

      <FormPriceInput name='targetCostPerRef' label='Chi phí/Ref mục tiêu' />

      <FormInput name='targetFtd' label='Mục tiêu FTD' type='number' />

      <FormPriceInput name='targetCostPerFtd' label='Chi phí/FTD mục tiêu' />

      <FormInput name='targetDailyKeyVolume' label='Volume key/ngày' type='number' />

      <FormPriceInput name='targetCpc' label='CPC mục tiêu' />

      <FormPriceInput name='budget' label='Ngân sách' />

      <FormPriceInput name='suggestedBid' label='Giá thầu đề xuất' />
    </div>
  );
}
