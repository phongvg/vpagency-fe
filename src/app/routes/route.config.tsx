import ProtectedRoute from "@/app/routes/ProtectedRoute";
import { urls } from "@/app/routes/route.constant";
import { LoginPage } from "@/modules/auth/login";
import { DashboardPage } from "@/modules/dashboard";
import { TaskListPage } from "@/modules/task";
import { UserListPage } from "@/modules/user";
import { Role } from "@/shared/constants/role.constant";
import BlankLayout from "@/shared/layouts/BlankLayout";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { ClipboardList, LayoutGrid, Users } from "lucide-react";
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
