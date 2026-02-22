import { useCreateCampaign } from "@/modules/campaign/hooks/useCreateCampaign";
import { useUpdateCampaign } from "@/modules/campaign/hooks/useUpdateCampaign";
import { transformCampaignToForm, transformFormToCampaign } from "@/modules/campaign/mappers/campaign.mapper";
import { CampaignFormSchema, type CampaignFormType } from "@/modules/campaign/schemas/campaign-form.schema";
import type { Campaign } from "@/modules/campaign/types/campaign.type";
import AppButton from "@/shared/components/common/AppButton";
import { FormArrayInput } from "@/shared/components/form/FormArrayInput";
import { FormDatePicker } from "@/shared/components/form/FormDatePicker";
import { FormInput } from "@/shared/components/form/FormInput";
import { FormPriceInput } from "@/shared/components/form/FormPriceInput";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface CampaignFormProps {
  campaign?: Campaign | undefined;
}

export default function CampaignForm({ campaign }: CampaignFormProps) {
  const navigate = useNavigate();

  const isEditMode = Boolean(campaign);

  const form = useForm<CampaignFormType>({
    defaultValues: transformCampaignToForm(campaign),
    resolver: zodResolver(CampaignFormSchema),
  });

  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();

  const {
    fields: keywordFields,
    append: appendKeyword,
    remove: removeKeyword,
  } = useFieldArray({
    control: form.control,
    name: "keywords",
  });

  const {
    fields: negativeKeywordFields,
    append: appendNegativeKeyword,
    remove: removeNegativeKeyword,
  } = useFieldArray({
    control: form.control,
    name: "negativeKeywords",
  });

  const {
    fields: topSearchTermFields,
    append: appendTopSearchTerm,
    remove: removeTopSearchTerm,
  } = useFieldArray({
    control: form.control,
    name: "topSearchTerms",
  });

  const {
    fields: locationStatFields,
    append: appendLocationStat,
    remove: removeLocationStat,
  } = useFieldArray({
    control: form.control,
    name: "locationStats",
  });

  useEffect(() => {
    if (campaign) {
      form.reset(transformCampaignToForm(campaign));
    } else {
      form.reset(transformCampaignToForm());
    }
  }, [campaign, form]);

  const onSubmit = (values: CampaignFormType) => {
    if (isEditMode) {
      updateCampaign.mutate({
        id: campaign?.id as string,
        campaign: transformFormToCampaign(values),
      });
    } else {
      createCampaign.mutate(transformFormToCampaign(values));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue='overview'>
          <TabsList className='mb-4'>
            <TabsTrigger value='overview'>Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value='keywords'>Từ khóa</TabsTrigger>
            <TabsTrigger value='negativeKeywords'>Từ khóa loại trừ</TabsTrigger>
            <TabsTrigger value='topSearchTerms'>Thuật ngữ tìm kiếm</TabsTrigger>
            <TabsTrigger value='locationStats'>Thống kê quốc gia</TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
            <div className='gap-4 grid grid-cols-4'>
              <FormDatePicker name='importAt' label='Ngày nhập dữ liệu' />
              <FormDatePicker name='date' label='Ngày dữ liệu' required />
              <FormInput name='uid' label='UID' required />
              <FormInput name='mcc' label='MCC' />
              <FormInput name='name' label='Tên chiến dịch' required />
              <FormInput name='externalId' label='Mã chiến dịch' required />
              <FormInput name='status' label='Trạng thái' />
              <FormPriceInput name='avgCpc' label='CPC trung bình' />
              <FormPriceInput name='targetCpc' label='Thầu chung' />
              <FormPriceInput name='clicks' label='Số lần click' />
              <FormPriceInput name='ctr' label='CTR' />
              <FormPriceInput name='cpm' label='CPM' />
              <FormPriceInput name='impression' label='Lượt hiển thị' />
              <FormPriceInput name='cost' label='Ngân sách chi tiêu' />
              <FormPriceInput name='campaignBudget' label='Ngân sách chiến dịch' />
              <FormInput name='finalUrlImport' label='URL cuối cùng' className='col-span-4' />
              <FormArrayInput name='targetLocations' label='Quốc gia mục tiêu' />
              <FormArrayInput name='locationExcluded' label='Quốc gia loại trừ' />
            </div>
          </TabsContent>
          <TabsContent value='keywords'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-semibold text-lg uppercase'>Danh sách từ khóa</h3>
                <Button
                  type='button'
                  size='sm'
                  onClick={() =>
                    appendKeyword({ keyword: "", match: "", clicks: null, ctr: null, cpc: null, cpm: null, cost: null, impression: null, bid: null })
                  }
                  className='gap-2'>
                  <Plus className='w-4 h-4' />
                  Thêm từ khóa
                </Button>
              </div>

              {keywordFields.length === 0 && (
                <p className='py-8 text-muted-foreground text-center'>Chưa có từ khóa nào. Nhấn "Thêm từ khóa" để bắt đầu.</p>
              )}

              {keywordFields.map((field, index) => (
                <div key={field.id} className='flex items-end gap-4 bg-card p-4 border rounded-lg'>
                  <div className='flex-1 gap-4 grid grid-cols-9'>
                    <FormInput name={`keywords.${index}.keyword`} label='Từ khóa' />
                    <FormInput name={`keywords.${index}.match`} label='Loại khớp' />
                    <FormPriceInput name={`keywords.${index}.clicks`} label='Số lần click' />
                    <FormPriceInput name={`keywords.${index}.ctr`} label='CTR' />
                    <FormPriceInput name={`keywords.${index}.cpc`} label='CPC' />
                    <FormPriceInput name={`keywords.${index}.cpm`} label='CPM' />
                    <FormPriceInput name={`keywords.${index}.cost`} label='Chi phí' />
                    <FormPriceInput name={`keywords.${index}.impression`} label='Lượt hiển thị' />
                    <FormPriceInput name={`keywords.${index}.bid`} label='Giá thầu' />
                  </div>
                  <Button type='button' size='icon' variant='destructive' onClick={() => removeKeyword(index)}>
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='negativeKeywords'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-semibold text-lg uppercase'>Danh sách từ khóa loại trừ</h3>
                <Button
                  type='button'
                  size='sm'
                  onClick={() =>
                    appendNegativeKeyword({
                      keyword: "",
                      match: "",
                      clicks: null,
                      ctr: null,
                      cpc: null,
                      cpm: null,
                      cost: null,
                      impression: null,
                      bid: null,
                    })
                  }
                  className='gap-2'>
                  <Plus className='w-4 h-4' />
                  Thêm từ khóa loại trừ
                </Button>
              </div>

              {negativeKeywordFields.length === 0 && (
                <p className='py-8 text-muted-foreground text-center'>Chưa có từ khóa loại trừ nào. Nhấn "Thêm từ khóa loại trừ" để bắt đầu.</p>
              )}

              {negativeKeywordFields.map((field, index) => (
                <div key={field.id} className='flex items-end gap-4 bg-card p-4 border rounded-lg'>
                  <div className='flex-1 gap-4 grid grid-cols-9'>
                    <FormInput name={`negativeKeywords.${index}.keyword`} label='Từ khóa' />
                    <FormInput name={`negativeKeywords.${index}.match`} label='Loại khớp' />
                    <FormPriceInput name={`negativeKeywords.${index}.clicks`} label='Số lần click' />
                    <FormPriceInput name={`negativeKeywords.${index}.ctr`} label='CTR' />
                    <FormPriceInput name={`negativeKeywords.${index}.cpc`} label='CPC' />
                    <FormPriceInput name={`negativeKeywords.${index}.cpm`} label='CPM' />
                    <FormPriceInput name={`negativeKeywords.${index}.cost`} label='Chi phí' />
                    <FormPriceInput name={`negativeKeywords.${index}.impression`} label='Lượt hiển thị' />
                    <FormPriceInput name={`negativeKeywords.${index}.bid`} label='Giá thầu' />
                  </div>
                  <Button type='button' size='icon' variant='destructive' onClick={() => removeNegativeKeyword(index)}>
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='topSearchTerms'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-semibold text-lg uppercase'>Thuật ngữ tìm kiếm hàng đầu</h3>
                <Button
                  type='button'
                  size='sm'
                  onClick={() => appendTopSearchTerm({ term: "", clicks: null, ctr: null, cpc: null, cpm: null, impression: null, cost: null })}
                  className='gap-2'>
                  <Plus className='w-4 h-4' />
                  Thêm thuật ngữ
                </Button>
              </div>

              {topSearchTermFields.length === 0 && (
                <p className='py-8 text-muted-foreground text-center'>Chưa có thuật ngữ nào. Nhấn "Thêm thuật ngữ" để bắt đầu.</p>
              )}

              {topSearchTermFields.map((field, index) => (
                <div key={field.id} className='flex items-end gap-4 bg-card p-4 border rounded-lg'>
                  <div className='flex-1 gap-4 grid grid-cols-7'>
                    <FormInput name={`topSearchTerms.${index}.term`} label='Thuật ngữ' />
                    <FormPriceInput name={`topSearchTerms.${index}.clicks`} label='Số lần click' />
                    <FormPriceInput name={`topSearchTerms.${index}.ctr`} label='CTR' />
                    <FormPriceInput name={`topSearchTerms.${index}.cpc`} label='CPC' />
                    <FormPriceInput name={`topSearchTerms.${index}.cpm`} label='CPM' />
                    <FormPriceInput name={`topSearchTerms.${index}.impression`} label='Lượt hiển thị' />
                    <FormPriceInput name={`topSearchTerms.${index}.cost`} label='Chi phí' />
                  </div>
                  <Button type='button' size='icon' variant='destructive' onClick={() => removeTopSearchTerm(index)}>
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='locationStats'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-semibold text-lg uppercase'>Thống kê theo quốc gia</h3>
                <Button
                  type='button'
                  size='sm'
                  onClick={() => appendLocationStat({ location: "", clicks: null, ctr: null, cpc: null, cpm: null, impression: null, cost: null })}
                  className='gap-2'>
                  <Plus className='w-4 h-4' />
                  Thêm quốc gia
                </Button>
              </div>

              {locationStatFields.length === 0 && (
                <p className='py-8 text-muted-foreground text-center'>Chưa có thống kê nào. Nhấn "Thêm quốc gia" để bắt đầu.</p>
              )}

              {locationStatFields.map((field, index) => (
                <div key={field.id} className='flex items-end gap-4 bg-card p-4 border rounded-lg'>
                  <div className='flex-1 gap-4 grid grid-cols-7'>
                    <FormInput name={`locationStats.${index}.location`} label='Quốc gia' />
                    <FormPriceInput name={`locationStats.${index}.clicks`} label='Số lần click' />
                    <FormPriceInput name={`locationStats.${index}.ctr`} label='CTR' />
                    <FormPriceInput name={`locationStats.${index}.cpc`} label='CPC' />
                    <FormPriceInput name={`locationStats.${index}.cpm`} label='CPM' />
                    <FormPriceInput name={`locationStats.${index}.impression`} label='Lượt hiển thị' />
                    <FormPriceInput name={`locationStats.${index}.cost`} label='Chi phí' />
                  </div>
                  <Button type='button' size='icon' variant='destructive' onClick={() => removeLocationStat(index)}>
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className='flex items-center gap-2 mt-6'>
          <AppButton type='submit' variant='outline' size='sm'>
            <Save />
            Xác nhận
          </AppButton>

          <AppButton size='sm' type='button' onClick={() => navigate(-1)}>
            Quay lại
          </AppButton>
        </div>
      </form>
    </Form>
  );
}
