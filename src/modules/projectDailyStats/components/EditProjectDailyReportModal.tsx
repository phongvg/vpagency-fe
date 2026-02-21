import ProjectDailyReportStep1Form from "@/modules/projectDailyStats/components/ProjectDailyReportStep1Form";
import ProjectDailyReportStep2Form from "@/modules/projectDailyStats/components/ProjectDailyReportStep2Form";
import { useGenerateProjectDailyReport } from "@/modules/projectDailyStats/hooks/useGenerateProjectDailyReport";
import { useProjectDailyReport } from "@/modules/projectDailyStats/hooks/useProjectDailyReport";
import { useUpdateProjectDailyReport } from "@/modules/projectDailyStats/hooks/useUpdateProjectDailyReport";
import {
  transformFormToProjectDailyReportStep1,
  transformProjectDailyReportToFormStep1,
  transformProjectDailyReportToFormStep2,
  transformProjectDailyReportToPayloadStep2,
} from "@/modules/projectDailyStats/mappers/project-daily-report.mapper";
import {
  projectDailyReportStep1Schema,
  type ProjectDailyReportStep1Type,
} from "@/modules/projectDailyStats/schemas/project-daily-report-step-1.schema";
import {
  projectDailyReportStep2Schema,
  type ProjectDailyReportStep2Type,
} from "@/modules/projectDailyStats/schemas/project-daily-report-step-2.schema";
import AppButton from "@/shared/components/common/AppButton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { getModalTitle } from "@/shared/utils/common.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditProjectDailyReportModalProps {
  open: boolean;
  onClose: () => void;
  reportId: string | null;
}

export default function EditProjectDailyReportModal({ open, onClose, reportId }: EditProjectDailyReportModalProps) {
  const isEditMode = !!reportId;

  const [step, setStep] = useState<number>(1);
  const [reportIdState, setReportIdState] = useState<string | null>(null);

  useEffect(() => {
    setReportIdState(reportId);
  }, [reportId]);

  const { data: projectDailyReport } = useProjectDailyReport(reportId);

  const generateProjectDailyReport = useGenerateProjectDailyReport();
  const updateProjectDailyReport = useUpdateProjectDailyReport();

  const step1Form = useForm<ProjectDailyReportStep1Type>({
    resolver: zodResolver(projectDailyReportStep1Schema),
    defaultValues: transformProjectDailyReportToFormStep1(),
  });

  const step2Form = useForm<ProjectDailyReportStep2Type>({
    resolver: zodResolver(projectDailyReportStep2Schema),
    defaultValues: transformProjectDailyReportToFormStep2(projectDailyReport),
  });

  useEffect(() => {
    step1Form.reset(transformProjectDailyReportToFormStep1());

    if (projectDailyReport) {
      step2Form.reset(transformProjectDailyReportToFormStep2(projectDailyReport));
      setStep(2);
    } else {
      step2Form.reset(transformProjectDailyReportToFormStep2());
      setStep(1);
    }
  }, [projectDailyReport]);

  const onSubmitStep1 = async (values: ProjectDailyReportStep1Type) => {
    await generateProjectDailyReport.mutateAsync(transformFormToProjectDailyReportStep1(values), {
      onSuccess: (res) => {
        setReportIdState(res.data.id);
        step2Form.reset(transformProjectDailyReportToFormStep2(res.data));
        setStep(2);
      },
    });
  };

  const onSubmitStep2 = async (values: ProjectDailyReportStep2Type) => {
    if (!reportIdState) {
      toast.error("Báo cáo không tồn tại");
      return;
    }

    await updateProjectDailyReport.mutateAsync(
      {
        id: reportIdState,
        payload: transformProjectDailyReportToPayloadStep2(values),
      },
      {
        onSuccess: () => {
          setStep(1);
          step1Form.reset(transformProjectDailyReportToFormStep1());
          step2Form.reset(transformProjectDailyReportToFormStep2());
          onClose();
        },
      }
    );
  };

  const renderModalAction = () => {
    return (
      <DialogFooter>
        <AppButton type='button' size='sm' onClick={onClose}>
          Đóng
        </AppButton>

        <AppButton type='submit' variant='outline' size='sm'>
          <Save />
          Xác nhận
        </AppButton>
      </DialogFooter>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-full sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>{getModalTitle(isEditMode, "báo cáo")}</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(onSubmitStep1)} className='space-y-4'>
              <ProjectDailyReportStep1Form />

              {renderModalAction()}
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(onSubmitStep2)} className='space-y-4'>
              <ProjectDailyReportStep2Form />

              {renderModalAction()}
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
