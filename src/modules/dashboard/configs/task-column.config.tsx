import TaskStatusChip from "@/modules/task/components/TaskStatusChip";
import type { Task } from "@/modules/task/types/task.type";
import { TaskPriorityMap } from "@/modules/task/utils/task.util";
import UserAvatar from "@/shared/components/UserAvatar";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const taskColumnConfig = (): ColumnDef<Task>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Tên công việc",
    accessorKey: "name",
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
    cell: (props) => <TaskStatusChip status={props.row.original.status} />,
  },
  {
    header: "Độ ưu tiên",
    accessorKey: "priority",
    cell: (props) => TaskPriorityMap[props.row.original.priority],
  },
  {
    header: "Người nhận việc",
    accessorKey: "assignedUsers",
    cell: (props) => <UserAvatar data={props.row.original.assignedUsers} />,
  },
  {
    header: "Deadline",
    accessorKey: "deadline",
    cell: (props) => formatDate(props.row.original.deadline, "dd/MM/yyyy"),
  },
];
