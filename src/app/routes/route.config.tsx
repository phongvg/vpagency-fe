import ProtectedRoute from "@/app/routes/ProtectedRoute";
import { urls } from "@/app/routes/route.constant";
import { AppealAccountListPage } from "@/modules/appealAccount";
import { LoginPage } from "@/modules/auth/login";
import { CampaignListPage } from "@/modules/campaign";
import { DashboardPage } from "@/modules/dashboard";
import { GmailListPage } from "@/modules/gmail";
import { GmailStatusListPage } from "@/modules/gmailStatus";
import { ProjectListPage } from "@/modules/project";
import { ProjectDailyStatsListPage } from "@/modules/projectDailyStats";
import { ProjectStatusListPage } from "@/modules/projectStatus";
import { ProjectTypeListPage } from "@/modules/projectType";
import { TaskListPage } from "@/modules/task";
import { UserListPage } from "@/modules/user";
import { Role } from "@/shared/constants/role.constant";
import BlankLayout from "@/shared/layouts/BlankLayout";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import {
  ChartNoAxesCombined,
  ClipboardList,
  FolderKanban,
  FolderTree,
  LayoutGrid,
  ListChecks,
  Mail,
  MailCheck,
  Megaphone,
  Users,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import type { AppRoute } from "./route.type";

export const appRoutes: AppRoute[] = [
  {
    path: urls.root,
    element: <Navigate to={urls.dashboard} replace />,
  },
  {
    path: urls.root,
    element: <DashboardLayout />,
    children: [
      {
        path: urls.dashboard,
        title: "Dashboard",
        pageTitle: "Tổng quan hệ thống",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AGENCY, Role.MEMBER_AFF, Role.ACCOUNTING]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
        icon: LayoutGrid,
        showInSidebar: true,
      },
      {
        path: urls.task,
        title: "Quản lý công việc",
        pageTitle: "Danh sách công việc",
        element: <TaskListPage />,
        icon: ClipboardList,
        showInSidebar: true,
      },
      {
        path: urls.campaign,
        title: "Quản lý chiến dịch",
        pageTitle: "Danh sách chiến dịch",
        element: <CampaignListPage />,
        icon: Megaphone,
        showInSidebar: true,
      },
      {
        path: urls.finance,
        title: "Báo cáo tài chính",
        pageTitle: "Báo cáo tài chính",
        element: <ProjectDailyStatsListPage />,
        icon: ChartNoAxesCombined,
        showInSidebar: true,
      },
      {
        path: urls.user,
        title: "Quản lý tài khoản",
        pageTitle: "Danh sách tài khoản",
        element: <UserListPage />,
        icon: Users,
        showInSidebar: true,
      },
      {
        path: urls.appealAccount,
        title: "Quản lý tài khoản ADS kháng giấy",
        pageTitle: "Danh sách tài khoản ADS kháng giấy",
        element: <AppealAccountListPage />,
        icon: Users,
        showInSidebar: true,
      },
      {
        path: urls.gmail,
        title: "Quản lý Gmail",
        pageTitle: "Danh sách Gmail",
        element: <GmailListPage />,
        icon: Mail,
        showInSidebar: true,
      },
      {
        path: urls.gmailStatus,
        title: "Quản lý trạng thái Gmail",
        pageTitle: "Danh sách trạng thái Gmail",
        element: <GmailStatusListPage />,
        icon: MailCheck,
        showInSidebar: true,
      },
      {
        path: urls.project,
        title: "Quản lý dự án",
        pageTitle: "Danh sách dự án",
        element: <ProjectListPage />,
        icon: FolderKanban,
        showInSidebar: true,
      },
      {
        path: urls.projectType,
        title: "Quản lý loại dự án",
        pageTitle: "Danh sách loại dự án",
        element: <ProjectTypeListPage />,
        icon: FolderTree,
        showInSidebar: true,
      },
      {
        path: urls.projectStatus,
        title: "Quản lý trạng thái dự án",
        pageTitle: "Danh sách trạng thái dự án",
        element: <ProjectStatusListPage />,
        icon: ListChecks,
        showInSidebar: true,
      },
    ],
  },
  {
    path: urls.auth,
    element: <BlankLayout />,
    children: [
      {
        path: urls.login,
        element: <LoginPage />,
        showInSidebar: false,
      },
    ],
  },
];
