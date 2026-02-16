import { useFinalUrlsByProjectId } from "@/modules/finalUrl/hooks/useFinalUrlsByProjectId";
import { projectFinalUrlColumnConfig } from "@/modules/project/configs/project-final-url-column.config";
import { AppTable } from "@/shared/components/common/AppTable";

interface ProjectFinalUrlsTableProps {
  projectId: string | null;
  onEdit: (finalUrlId: string) => void;
  onDelete: (finalUrlId: string) => void;
}

export default function ProjectFinalUrlsTable({ projectId, onEdit, onDelete }: ProjectFinalUrlsTableProps) {
  const { data: finalUrls, isLoading } = useFinalUrlsByProjectId(projectId);

  return (
    <AppTable
      columns={projectFinalUrlColumnConfig({ onEdit, onDelete })}
      data={finalUrls ?? []}
      loading={isLoading}
      page={1}
      pageCount={1}
      pageSize={finalUrls?.length ?? 0}
    />
  );
}
