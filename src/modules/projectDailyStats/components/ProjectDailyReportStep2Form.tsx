import type { ProjectDailyReportStep2Type } from "@/modules/projectDailyStats/schemas/project-daily-report-step-2.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { FormInput } from "@/shared/components/form/FormInput";
import { FormPriceInput } from "@/shared/components/form/FormPriceInput";
import { fixedNumber } from "@/shared/utils/common.util";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function ProjectDailyReportStep2Form() {
  const { control, setValue } = useFormContext<ProjectDailyReportStep2Type>();

  const [totalRef, totalFtd, receivedRevenue, totalClicks, totalCost, totalTargetDailyKeyVolume, totalTargetRef] = useWatch({
    control,
    name: ["totalRef", "totalFtd", "receivedRevenue", "totalClicks", "totalCost", "totalTargetDailyKeyVolume", "totalTargetRef"],
  });

  useEffect(() => {
    const ref = totalRef ?? 0;
    const ftd = totalFtd ?? 0;
    const revenue = receivedRevenue ?? 0;
    const clicks = totalClicks ?? 0;
    const cost = totalCost ?? 0;
    const volume = totalTargetDailyKeyVolume ?? 0;
    const targetRef = totalTargetRef ?? 0;

    const costPerRef = ref ? cost / ref : 0;
    const rateRefPerClick = clicks ? (ref / clicks) * 100 : 0;
    const costPerFtd = ftd ? cost / ftd : 0;
    const costFtdPerRef = ref ? (ftd / ref) * 100 : 0;
    const totalClickPerVolume = volume ? (clicks / volume) * 100 : 0;
    const totalRefPerVolume = targetRef ? (ref / targetRef) * 100 : 0;
    const profit = revenue - cost;
    const roi = cost ? (profit / cost) * 100 : 0;

    setValue("costPerRef", fixedNumber(costPerRef), { shouldDirty: false });
    setValue("rateRefPerClick", fixedNumber(rateRefPerClick), { shouldDirty: false });
    setValue("costPerFtd", fixedNumber(costPerFtd), { shouldDirty: false });
    setValue("costFtdPerRef", fixedNumber(costFtdPerRef), { shouldDirty: false });
    setValue("totalClickPerVolume", fixedNumber(totalClickPerVolume), { shouldDirty: false });
    setValue("totalRefPerVolume", fixedNumber(totalRefPerVolume), { shouldDirty: false });
    setValue("profit", fixedNumber(profit), { shouldDirty: false });
    setValue("roi", fixedNumber(roi), { shouldDirty: false });
  }, [totalRef, totalFtd, receivedRevenue, totalClicks, totalCost, totalTargetDailyKeyVolume, totalTargetRef, setValue]);

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Số liệu hệ thống</CardTitle>
        </CardHeader>

        <CardContent>
          <div className='gap-4 grid grid-cols-3'>
            <FormInput type='number' name='totalClicks' label='Tổng lượt click' disabled />
            <FormPriceInput name='totalTargetCpc' label='Tổng CPC mục tiêu' disabled />
            <FormInput type='number' name='totalTargetDailyKeyVolume' label='Tổng Volume key/ngày mục tiêu' disabled />
            <FormInput type='number' name='totalTargetRef' label='Tổng Ref mục tiêu' disabled />
            <FormPriceInput name='totalCost' label='Tổng chi tiêu' disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kế toán nhập (Bắt buộc)</CardTitle>
        </CardHeader>

        <CardContent>
          <div className='gap-4 grid grid-cols-2'>
            <FormInput type='number' name='totalRef' label='Tổng Ref' required />
            <FormInput type='number' name='totalFtd' label='Tổng Ftd' required />
            <FormPriceInput name='receivedRevenue' label='Hoa hồng rút về' required />
            <FormPriceInput name='holdRevenue' label='Hoa hồng tạm giữ' required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kết quả tính toán (Tự động)</CardTitle>
        </CardHeader>

        <CardContent>
          <div className='gap-4 grid grid-cols-4'>
            <FormInput type='number' name='costPerRef' label='Chi phí mỗi Ref' disabled />
            <FormInput type='number' name='rateRefPerClick' label='Tỷ lệ Ref trên mỗi Click (%)' disabled />
            <FormInput type='number' name='costPerFtd' label='Chi phí mỗi Ftd' disabled />
            <FormInput type='number' name='costFtdPerRef' label='Tỷ lệ FTD/Ref (%)' disabled />
            <FormInput type='number' name='totalClickPerVolume' label='Tỷ lệ Click trên mỗi Volume (%)' disabled />
            <FormInput type='number' name='totalRefPerVolume' label='Tỷ lệ Ref trên mỗi Volume (%)' disabled />
            <FormInput type='number' name='roi' label='ROI (%)' disabled />
            <FormInput type='number' name='profit' label='Lợi nhuận' disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
