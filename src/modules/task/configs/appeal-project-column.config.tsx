import type { Project } from "@/modules/project/types/project.type";
import BadgeStatus from "@/shared/components/BadgeStatus";
import type { ColumnDef } from "@tanstack/react-table";

export const appealProjectColumnConfig: ColumnDef<Project>[] = [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Dự án",
    accessorKey: "name",
    cell: (props) => <span className='font-semibold text-primary'>{props.row.original.name}</span>,
  },
  {
    header: "Loại dự án",
    accessorKey: "typeName",
    cell: (props) => <span className='font-medium text-blue-600 dark:text-blue-400'>{props.row.original.typeName}</span>,
  },
  {
    header: "Trạng thái",
    accessorKey: "statusName",
    cell: (props) => {
      return <BadgeStatus status={props.row.original.statusName} />;
    },
  },
];
