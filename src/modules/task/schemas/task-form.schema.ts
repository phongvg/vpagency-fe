import { TaskType } from "@/modules/task/types/task.type";
import * as z from "zod";

const REQUIRE_PROJECT_TYPES = [TaskType.SET_CAMPAIGN, TaskType.LAUNCH_CAMPAIGN, TaskType.NURTURE_ACCOUNT] as const;

const needProject = (type: TaskType) => REQUIRE_PROJECT_TYPES.includes(type);

export const taskFormSchema = z
  .object({
    name: z.string().min(1, "Tên công việc không được bỏ trống"),
    type: z.string().min(1, "Loại công việc không được bỏ trống"),
    frequency: z.string().min(1, "Tần suất không được bỏ trống"),
    priority: z.string().min(1, "Độ ưu tiên không được bỏ trống"),
    deadline: z.date().min(new Date(), "Hạn hoàn thành không được bỏ trống"),
    assignedUserIds: z.array(z.string()).min(1, "Phải có ít nhất một người được giao việc"),
    projectId: z.string().nullable().optional(),
    finalUrlIds: z.array(z.string()).optional(),
    dailyBudget: z.number().min(0, "Ngân sách hàng ngày phải lớn hơn hoặc bằng 0").optional(),
    numberOfAccounts: z.number().min(1, "Số tài khoản phải lớn hơn hoặc bằng 1").optional(),
    numberOfResultCampaigns: z.number().min(1, "Số chiến dịch kết quả phải lớn hơn hoặc bằng 1").optional(),
    numberOfSuspendedAccounts: z.number().min(1, "Số tài khoản tạm ngưng phải lớn hơn hoặc bằng 1").optional(),
    numberOfAppealDocuments: z.number().min(1, "Số tài khoản kháng phải lớn hơn hoặc bằng 1").optional(),
    researchContent: z.string().optional(),
    projectIds: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (needProject(data.type) && !data.projectId) {
      ctx.addIssue({
        path: ["projectId"],
        message: "Dự án không được bỏ trống",
        code: z.ZodIssueCode.custom,
      });
    }

    if (needProject(data.type) && (!data.finalUrlIds || data.finalUrlIds.length === 0)) {
      ctx.addIssue({
        path: ["finalUrlIds"],
        message: "Phải có ít nhất một URL cuối",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type TaskFormType = z.infer<typeof taskFormSchema>;
