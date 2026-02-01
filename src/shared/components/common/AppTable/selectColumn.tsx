import { Checkbox } from "@/shared/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";

export const selectColumn = <T,>(): ColumnDef<T> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} />
  ),
  cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
  enableSorting: false,
  enableHiding: false,
});
