import type { TopFinalUrlByCost } from "@/modules/dashboard/types/dashboard.type";
import { topFinalUrlColumnConfig } from "@/modules/projectDailyStats/configs/top-final-url-column.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { AppTable } from "@/shared/components/common/AppTable";
import type { VisibilityState } from "@tanstack/react-table";
import { getMonth } from "date-fns";
import { useMemo, useState } from "react";

interface TopFinalUrlTableProps {
  topFinalUrlsByCost: TopFinalUrlByCost[] | undefined;
  loading: boolean;
}

export default function TopFinalUrlTable({ topFinalUrlsByCost, loading }: TopFinalUrlTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const month = useMemo(() => getMonth(new Date()) + 1, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan URL - Tháng {month}</CardTitle>
      </CardHeader>

      <CardContent className='normal-case'>
        <AppTable
          data={topFinalUrlsByCost ?? []}
          columns={topFinalUrlColumnConfig()}
          loading={loading}
          page={1}
          pageCount={1}
          pageSize={topFinalUrlsByCost?.length || 0}
          onPageChange={() => {}}
          enableColumnVisibility
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </CardContent>
    </Card>
  );
}
