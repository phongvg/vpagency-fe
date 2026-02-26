import ProtectedRoute from "@/app/routes/ProtectedRoute";
import { urls } from "@/app/routes/route.constant";
import { ForbiddenPage } from "@/modules/403";
import { AppealAccountListPage } from "@/modules/appealAccount";
import { LoginPage } from "@/modules/auth/login";
import { LoginTelegramPage } from "@/modules/auth/loginTelegram";
import { CampaignEditPage, CampaignListPage } from "@/modules/campaign";
import { DashboardPage } from "@/modules/dashboard";
import { GmailListPage } from "@/modules/gmail";
import { GmailStatusListPage } from "@/modules/gmailStatus";
import UpdateProfilePage from "@/modules/me/pages/UpdateProfilePage";
import { ProjectListPage } from "@/modules/project";
import { ProjectDailyStatsListPage } from "@/modules/projectDailyStats";
import { ProjectStatusListPage } from "@/modules/projectStatus";
import { ProjectTypeListPage } from "@/modules/projectType";
import { TaskListPage, TaskProgressDetailPage } from "@/modules/task";
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
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AGENCY, Role.MEMBER_AFF, Role.ACCOUNTING],
      },
      {
        path: urls.task,
        title: "Quản lý công việc",
        pageTitle: "Danh sách công việc",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING]}>
            <TaskListPage />
          </ProtectedRoute>
        ),
        icon: ClipboardList,
        showInSidebar: true,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.taskProgress,
        title: "Chi tiết tiến độ công việc",
        pageTitle: "Chi tiết tiến độ công việc",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING]}>
            <TaskProgressDetailPage />
          </ProtectedRoute>
        ),
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.campaign,
        title: "Quản lý chiến dịch",
        pageTitle: "Danh sách chiến dịch",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING]}>
            <CampaignListPage />
          </ProtectedRoute>
        ),
        icon: Megaphone,
        showInSidebar: true,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.editCampaign,
        title: "Chỉnh sửa chiến dịch",
        pageTitle: "Chỉnh sửa chiến dịch",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING]}>
            <CampaignEditPage />
          </ProtectedRoute>
        ),
        icon: Megaphone,
        showInSidebar: false,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.createCampaign,
        title: "Tạo chiến dịch",
        pageTitle: "Tạo chiến dịch",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING]}>
            <CampaignEditPage />
          </ProtectedRoute>
        ),
        icon: Megaphone,
        showInSidebar: false,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.projectDailyReport,
        title: "Báo cáo tài chính",
        pageTitle: "Báo cáo tài chính",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.ACCOUNTING]}>
            <ProjectDailyStatsListPage />
          </ProtectedRoute>
        ),
        icon: ChartNoAxesCombined,
        showInSidebar: true,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.user,
        title: "Quản lý tài khoản hệ thống",
        pageTitle: "Danh sách tài khoản hệ thống",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN]}>
            <UserListPage />
          </ProtectedRoute>
        ),
        icon: Users,
        showInSidebar: true,
        roles: [Role.ADMIN],
      },
      {
        path: urls.appealAccount,
        title: "Quản lý tài khoản ADS kháng giấy",
        pageTitle: "Danh sách tài khoản ADS kháng giấy",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MEMBER_AFF, Role.ACCOUNTING]}>
            <AppealAccountListPage />
          </ProtectedRoute>
        ),
        icon: Users,
        showInSidebar: true,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MEMBER_AFF, Role.ACCOUNTING],
      },
      {
        path: urls.gmail,
        title: "Quản lý Gmail",
        pageTitle: "Danh sách Gmail",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING]}>
            <GmailListPage />
          </ProtectedRoute>
        ),
        icon: Mail,
        showInSidebar: true,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.gmailStatus,
        title: "Quản lý trạng thái Gmail",
        pageTitle: "Danh sách trạng thái Gmail",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN]}>
            <GmailStatusListPage />
          </ProtectedRoute>
        ),
        icon: MailCheck,
        showInSidebar: true,
        roles: [Role.ADMIN],
      },
      {
        path: urls.project,
        title: "Quản lý dự án",
        pageTitle: "Danh sách dự án",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING]}>
            <ProjectListPage />
          </ProtectedRoute>
        ),
        icon: FolderKanban,
        showInSidebar: true,
        roles: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY, Role.ACCOUNTING],
      },
      {
        path: urls.projectType,
        title: "Quản lý loại dự án",
        pageTitle: "Danh sách loại dự án",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN]}>
            <ProjectTypeListPage />
          </ProtectedRoute>
        ),
        icon: FolderTree,
        showInSidebar: true,
        roles: [Role.ADMIN],
      },
      {
        path: urls.projectStatus,
        title: "Quản lý trạng thái dự án",
        pageTitle: "Danh sách trạng thái dự án",
        element: (
          <ProtectedRoute permissions={[Role.ADMIN]}>
            <ProjectStatusListPage />
          </ProtectedRoute>
        ),
        icon: ListChecks,
        showInSidebar: true,
        roles: [Role.ADMIN],
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
        pageTitle: "Đăng nhập",
        showInSidebar: false,
      },
      {
        path: urls.telegram,
        element: <LoginTelegramPage />,
        pageTitle: "Đăng nhập bằng Telegram",
        showInSidebar: false,
      },
      {
        path: urls.updateProfile,
        element: <UpdateProfilePage />,
        pageTitle: "Cập nhật thông tin cá nhân",
        showInSidebar: false,
      },
    ],
  },
  {
    path: urls.forbidden,
    element: <ForbiddenPage />,
    pageTitle: "403 - Không có quyền truy cập",
    showInSidebar: false,
  },
];
