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
  },
  {
    header: "Loại dự án",
    accessorKey: "typeName",
  },
  {
    header: "Trạng thái",
    accessorKey: "statusName",
    cell: (props) => {
      return <BadgeStatus status={props.row.original.statusName} />;
    },
  },
];
