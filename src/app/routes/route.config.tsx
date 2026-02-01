import ProtectedRoute from "@/app/routes/ProtectedRoute";
import { urls } from "@/app/routes/route.constant";
import { LoginPage } from "@/modules/auth/login";
import { CampaignListPage } from "@/modules/campaign";
import { DashboardPage } from "@/modules/dashboard";
import { GmailListPage } from "@/modules/gmail";
import { ProjectStatusListPage } from "@/modules/projectStatus";
import { ProjectTypeListPage } from "@/modules/projectType";
import { TaskListPage } from "@/modules/task";
import { UserListPage } from "@/modules/user";
import { Role } from "@/shared/constants/role.constant";
import BlankLayout from "@/shared/layouts/BlankLayout";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { ClipboardList, LayoutGrid, LayoutList, Users } from "lucide-react";
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
        path: urls.user,
        title: "Quản lý tài khoản",
        pageTitle: "Danh sách tài khoản",
        element: <UserListPage />,
        icon: Users,
        showInSidebar: true,
      },
      {
        path: urls.gmail,
        title: "Quản lý gmail",
        pageTitle: "Danh sách gmail",
        element: <GmailListPage />,
        icon: Users,
        showInSidebar: true,
      },
      {
        path: urls.campaign,
        title: "Quản lý chiến dịch",
        pageTitle: "Danh sách chiến dịch",
        element: <CampaignListPage />,
        icon: LayoutList,
        showInSidebar: true,
      },
      {
        path: urls.projectType,
        title: "Quản lý loại dự án",
        pageTitle: "Danh sách loại dự án",
        element: <ProjectTypeListPage />,
        icon: LayoutList,
        showInSidebar: true,
      },
      {
        path: urls.projectStatus,
        title: "Quản lý trạng thái dự án",
        pageTitle: "Danh sách trạng thái dự án",
        element: <ProjectStatusListPage />,
        icon: LayoutList,
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
