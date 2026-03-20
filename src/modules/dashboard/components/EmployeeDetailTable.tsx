import { employeeDetailColumnConfig } from "@/modules/dashboard/configs/employee-detail-column.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { AppTable } from "@/shared/components/common/AppTable";
import { Checkbox } from "@/shared/components/ui/checkbox";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface EmployeeProjectTableProps {
  employee: {
    id: number;
    name: string;
    projects: any[];
  };
}

export default function EmployeeProjectTable({ employee }: EmployeeProjectTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const baseColumns = useMemo(() => employeeDetailColumnConfig(), []);

  const allProjectIds = useMemo(() => employee.projects.map((p) => p.id), [employee.projects]);

  const calculateSelectedTotals = (projects: any[], selection: RowSelectionState) => {
    const selectedIds = Object.keys(selection).filter((key) => selection[key]);
    const selectedProjects = projects.filter((p) => selectedIds.includes(p.id));

    if (selectedProjects.length === 0) {
      return null;
    }

    const totals = {
      id: "total-row",
      projectName: `Tổng dự án đã chọn (${selectedProjects.length})`,
      cost: 0,
      cpc: 0,
      clicks: 0,
      impressions: 0,
      ref: 0,
      ftd: 0,
      tasksAssigned: 0,
      tasksCompleted: 0,
      tasksFailed: 0,
      tasksCompletionRate: 0,
      linksAssigned: 0,
      linksProfitable: 0,
      linksProfitRate: 0,
      holdRevenue: 0,
      receivedRevenue: 0,
      profit: 0,
      roi: 0,
    };

    selectedProjects.forEach((project) => {
      totals.cost += project.cost || 0;
      totals.clicks += project.clicks || 0;
      totals.impressions += project.impressions || 0;
      totals.ref += project.ref || 0;
      totals.ftd += project.ftd || 0;
      totals.tasksAssigned += project.tasksAssigned || 0;
      totals.tasksCompleted += project.tasksCompleted || 0;
      totals.tasksFailed += project.tasksFailed || 0;
      totals.linksAssigned += project.linksAssigned || 0;
      totals.linksProfitable += project.linksProfitable || 0;
      totals.holdRevenue += project.holdRevenue || 0;
      totals.receivedRevenue += project.receivedRevenue || 0;
      totals.profit += project.profit || 0;
    });

    if (totals.clicks > 0) {
      totals.cpc = Math.round(totals.cost / totals.clicks);
    }

    if (totals.tasksAssigned > 0) {
      totals.tasksCompletionRate = Math.round((totals.tasksCompleted / totals.tasksAssigned) * 100);
    }

    if (totals.linksAssigned > 0) {
      totals.linksProfitRate = Math.round((totals.linksProfitable / totals.linksAssigned) * 100);
    }

    if (totals.cost > 0) {
      totals.roi = Math.round((totals.profit / totals.cost) * 100);
    }

    return totals;
  };

  const totals = calculateSelectedTotals(employee.projects, rowSelection);
  const dataWithTotals = totals ? [...employee.projects, totals] : employee.projects;

  const allSelected = allProjectIds.length > 0 && allProjectIds.every((id) => rowSelection[id]);

  const toggleAllProjects = (checked: boolean) => {
    if (checked) {
      const newSelection: RowSelectionState = {};
      allProjectIds.forEach((id) => {
        newSelection[id] = true;
      });
      setRowSelection(newSelection);
    } else {
      setRowSelection({});
    }
  };

  const columnsWithCheckbox: ColumnDef<any>[] = [
    {
      id: "__select",
      header: () => <Checkbox checked={allSelected} onCheckedChange={toggleAllProjects} />,
      cell: ({ row }) => {
        if (row.original.id === "total-row") {
          return null;
        }
        return (
          <Checkbox
            checked={!!rowSelection[row.original.id]}
            onCheckedChange={(checked) =>
              setRowSelection((prev) => ({
                ...prev,
                [row.original.id]: !!checked,
              }))
            }
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    ...baseColumns,
  ];

  const getRowClassName = (row: any) => {
    if (row.id === "total-row") {
      return "bg-muted/50 font-semibold border-t-2";
    }
    return "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{employee.name}</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <AppTable columns={columnsWithCheckbox} data={dataWithTotals} rowIdKey='id' getRowClassName={getRowClassName} />
      </CardContent>
    </Card>
  );
}
