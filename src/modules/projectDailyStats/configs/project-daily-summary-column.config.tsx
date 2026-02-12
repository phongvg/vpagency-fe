import type { ProjectDailyStatsSummary } from "@/modules/projectDailyStats/types/projectDailyStats.type";
import type { Role } from "@/shared/constants/role.constant";
import { fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import { isAdminOrAccounting } from "@/shared/utils/permission.util";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  BadgeDollarSign,
  Calculator,
  CheckCircle,
  DollarSign,
  MousePointerClick,
  Percent,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

const HeaderWithIcon = ({ icon: Icon, label, color }: { icon: any; label: string; color: string }) => (
  <div className='flex items-center gap-1'>
    <Icon className={`w-4 h-4 ${color}`} />
    <span className={color}>{label}</span>
  </div>
);

export const projectDailySummaryColumnConfig = (roles: Role[] | undefined): ColumnDef<ProjectDailyStatsSummary>[] => [
  {
    id: "index",
    header: "STT",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên dự án",
    accessorKey: "projectName",
    minSize: 180,
  },
  {
    header: () => <HeaderWithIcon icon={DollarSign} label='Tổng chi tiêu' color='text-red-500' />,
    accessorKey: "totalCost",
    cell: (props) => <span className='font-bold text-red-500'>{formatDollarAmount(props.row.original.totalCost)}</span>,
  },
  {
    header: () => <HeaderWithIcon icon={MousePointerClick} label='Tổng lượt click' color='text-blue-500' />,
    accessorKey: "totalClicks",
    cell: (props) => <span className='font-bold text-blue-500'>{props.row.original.totalClicks}</span>,
  },
  {
    header: () => <HeaderWithIcon icon={TrendingUp} label='CPC trung bình' color='text-purple-500' />,
    accessorKey: "avgTargetCpc",
    cell: (props) => <span className='font-bold text-purple-500'>{formatDollarAmount(props.row.original.avgTargetCpc)}</span>,
  },
  ...((isAdminOrAccounting(roles)
    ? [
        {
          header: () => <HeaderWithIcon icon={TrendingUp} label='Lợi nhuận' color='text-green-500' />,
          accessorKey: "profit",
          cell: (props) => <span className='font-bold text-green-500'>{formatDollarAmount(props.row.original.profit)}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Percent} label='ROI (%)' color='text-yellow-500' />,
          accessorKey: "roi",
          cell: (props) => <span className='font-bold text-yellow-500'>{`${fixedNumber(props.row.original.roi)}%`}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Wallet} label='Hoa hồng tạm giữ' color='text-orange-500' />,
          accessorKey: "holdRevenue",
          cell: (props) => <span className='font-bold text-orange-500'>{formatDollarAmount(props.row.original.holdRevenue)}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={BadgeDollarSign} label='Hoa hồng rút về' color='text-emerald-500' />,
          accessorKey: "receivedRevenue",
          cell: (props) => <span className='font-bold text-emerald-500'>{formatDollarAmount(props.row.original.receivedRevenue)}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Users} label='Tổng Ref' color='text-cyan-500' />,
          accessorKey: "totalRef",
          cell: (props) => <span className='font-bold text-cyan-500'>{props.row.original.totalRef}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Calculator} label='Chi phí mỗi Ref' color='text-pink-500' />,
          accessorKey: "costPerRef",
          cell: (props) => <span className='font-bold text-pink-500'>{formatDollarAmount(props.row.original.costPerRef)}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Percent} label='Tỷ lệ Ref/Click (%)' color='text-teal-500' />,
          accessorKey: "rateRefPerClick",
          cell: (props) => <span className='font-bold text-teal-500'>{`${fixedNumber(props.row.original.rateRefPerClick)}%`}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={UserCheck} label='Số FTD' color='text-lime-500' />,
          accessorKey: "totalFtd",
          cell: (props) => <span className='font-bold text-lime-500'>{props.row.original.totalFtd}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Calculator} label='Chi phí mỗi FTD' color='text-rose-500' />,
          accessorKey: "costPerFtd",
          cell: (props) => <span className='font-bold text-rose-500'>{formatDollarAmount(props.row.original.costPerFtd)}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Percent} label='Tỷ lệ FTD/Ref (%)' color='text-violet-500' />,
          accessorKey: "rateFtdPerRef",
          cell: (props) => <span className='font-bold text-violet-500'>{`${fixedNumber(props.row.original.rateFtdPerRef)}%`}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Activity} label='Volume key/ngày' color='text-amber-500' />,
          accessorKey: "totalTargetDailyKeyVolume",
          cell: (props) => <span className='font-bold text-amber-500'>{props.row.original.totalTargetDailyKeyVolume}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={Target} label='Dự tính Ref/ngày' color='text-indigo-500' />,
          accessorKey: "totalTargetRef",
          cell: (props) => <span className='font-bold text-indigo-500'>{props.row.original.totalTargetRef}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={CheckCircle} label='% Click đạt được' color='text-green-600' />,
          accessorKey: "clickAchievementRate",
          cell: (props) => <span className='font-bold text-green-600'>{`${fixedNumber(props.row.original.clickAchievementRate)}%`}</span>,
        },
        {
          header: () => <HeaderWithIcon icon={CheckCircle} label='% Ref đạt được' color='text-emerald-600' />,
          accessorKey: "refAchievementRate",
          cell: (props) => <span className='font-bold text-emerald-600'>{`${fixedNumber(props.row.original.refAchievementRate)}%`}</span>,
        },
      ]
    : []) as ColumnDef<ProjectDailyStatsSummary>[]),
];
