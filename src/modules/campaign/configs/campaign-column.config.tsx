import type { Campaign } from "@/modules/campaign/types/campaign.type";
import BadgeStatus from "@/shared/components/BadgeStatus/BadgeStatus";
import { AppButton } from "@/shared/components/common/AppButton";
import ListTooltip from "@/shared/components/ListTooltip/ListTooltip";
import UserAvatar from "@/shared/components/UserAvatar/UserAvatar";
import { addDash, copyTextToClipboard, fixedNumber, formatDollarAmount } from "@/shared/utils/common.util";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Copy } from "lucide-react";

export const campaignColumnConfig = (): ColumnDef<Campaign>[] => [
  {
    header: "STT",
    id: "index",
    cell: (props) => props.row.index + 1,
  },
  {
    header: "Ngày nhập",
    accessorKey: "importAt",
    cell: (props) => {
      const row = props.row.original.importAt;

      if (!row) return null;
      return formatDate(row, "dd/MM/yyyy HH:mm");
    },
  },
  {
    header: "Dữ liệu ngày",
    accessorKey: "date",
    cell: (props) => {
      const row = props.row.original.date;

      if (!row) return null;
      return formatDate(row, "dd/MM/yyyy HH:mm");
    },
  },
  {
    header: "UID",
    accessorKey: "uid",
    cell: (props) => (
      <div className='flex items-center gap-1 whitespace-nowrap'>
        {addDash(props.row.original.uid)}
        <AppButton type='button' size='sm' variant='ghost' title='Sao chép' onClick={() => copyTextToClipboard(addDash(props.row.original.uid))}>
          <Copy />
        </AppButton>
      </div>
    ),
  },
  {
    header: "ID chiến dịch",
    accessorKey: "externalId",
    cell: (props) => (
      <div className='flex items-center gap-1'>
        {props.row.original.externalId}
        <AppButton type='button' size='sm' variant='ghost' title='Sao chép' onClick={() => copyTextToClipboard(props.row.original.externalId)}>
          <Copy />
        </AppButton>
      </div>
    ),
  },
  {
    header: "Tên chiến dịch",
    accessorKey: "name",
  },
  {
    header: "URL",
    accessorKey: "finalUrl",
    cell: (props) => (
      <a
        href={props.row.original.finalUrlImport || "#"}
        target='_blank'
        rel='noopener noreferrer'
        className='block max-w-xs text-blue-400 hover:underline truncate'
        title={props.row.original.finalUrlImport || ""}>
        {props.row.original.finalUrlImport}
      </a>
    ),
  },
  {
    header: "Gmail",
    accessorKey: "gmail",
  },
  {
    header: "Trạng thái chiến dịch",
    accessorKey: "status",
    cell: (props) => <BadgeStatus status={props.row.original.status} />,
  },
  {
    header: "Người nhập",
    accessorKey: "importer",
    cell: (props) => <UserAvatar data={props.row.original.importer} />,
  },
  {
    header: "MCC",
    accessorKey: "mcc",
    cell: (props) => <span className='whitespace-nowrap'>{addDash(props.row.original.mcc)}</span>,
  },
  {
    header: "CPC trung bình",
    accessorKey: "avgCpc",
    cell: (props) => formatDollarAmount(props.row.original.avgCpc),
  },
  {
    header: "Thầu chung",
    accessorKey: "targetCpc",
    cell: (props) => formatDollarAmount(props.row.original.targetCpc),
  },
  {
    header: "Click",
    accessorKey: "clicks",
  },
  {
    header: "CTR",
    accessorKey: "ctr",
    cell: (props) => <span>{fixedNumber(props.row.original.ctr)}%</span>,
  },
  {
    header: "CPM",
    accessorKey: "cpm",
    cell: (props) => <span>{fixedNumber(props.row.original.cpm)}</span>,
  },
  {
    header: "Ngân sách chi tiêu",
    accessorKey: "cost",
    cell: (props) => formatDollarAmount(props.row.original.cost),
  },
  {
    header: "Lượt hiển thị",
    accessorKey: "impression",
  },
  {
    header: "Ngân sách chiến dịch",
    accessorKey: "campaignBudget",
    cell: (props) => formatDollarAmount(props.row.original.campaignBudget),
  },
  {
    header: "Từ khóa",
    cell: (props) => {
      const keywords = props.row.original.keywords || [];
      if (keywords.length === 0) return null;

      return (
        <ListTooltip
          data={keywords.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
          columns={[
            { key: "keyword", label: "Từ khóa" },
            { key: "match", label: "Hình thức" },
            { key: "bid", label: "Bid" },
            { key: "clicks", label: "Click" },
            { key: "impression", label: "Lượt hiển thị" },
            { key: "ctr", label: "CTR" },
            { key: "cpc", label: "CPC" },
            { key: "cpm", label: "CPM" },
            { key: "cost", label: "Chi phí" },
          ]}
        />
      );
    },
  },
  {
    header: "Từ khóa không tìm kiếm",
    cell: (props) => {
      const keywords = props.row.original.negativeKeywords || [];
      if (keywords.length === 0) return null;

      return (
        <ListTooltip
          data={keywords.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
          columns={[
            { key: "keyword", label: "Từ khóa" },
            { key: "match", label: "Hình thức" },
          ]}
        />
      );
    },
  },
  {
    header: "Thuật ngữ tìm kiếm",
    cell: (props) => {
      const terms = props.row.original.topSearchTerms || [];
      if (terms.length === 0) return "";

      return (
        <ListTooltip
          data={terms.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
          columns={[
            { key: "term", label: "Thuật ngữ" },
            { key: "clicks", label: "Click" },
            { key: "impression", label: "Lượt hiển thị" },
            { key: "ctr", label: "CTR" },
            { key: "cpc", label: "CPC" },
            { key: "cpm", label: "CPM" },
            { key: "cost", label: "Chi phí" },
          ]}
        />
      );
    },
  },
  {
    header: "Quốc gia mục tiêu",
    accessorKey: "targetLocations",
    cell: (props) => {
      const locations = props.row.original.targetLocations || [];
      if (locations.length === 0) return null;

      return (
        <div className='flex items-center gap-2'>
          <ListTooltip data={locations.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          <AppButton type='button' size='sm' variant='ghost' title='Sao chép' onClick={() => copyTextToClipboard(locations.join("\n"))}>
            <Copy />
          </AppButton>
        </div>
      );
    },
  },
  {
    header: "Quốc gia loại trừ",
    accessorKey: "locationExcluded",
    cell: (props) => {
      const locations = props.row.original.locationExcluded || [];
      if (locations.length === 0) return null;

      return (
        <div className='flex items-center gap-2'>
          <ListTooltip data={locations.map((l) => ({ name: l }))} columns={[{ key: "name", label: "Quốc gia" }]} />
          <AppButton type='button' size='sm' variant='ghost' title='Sao chép' onClick={() => copyTextToClipboard(locations.join("\n"))}>
            <Copy />
          </AppButton>
        </div>
      );
    },
  },
  {
    header: "Thống kê quốc gia",
    accessorKey: "locationStats",
    cell: (props) => {
      const stats = props.row.original.locationStats || [];
      if (stats.length === 0) return null;

      return (
        <ListTooltip
          data={stats.sort((a, b) => (b.cost || 0) - (a.cost || 0))}
          columns={[
            { key: "location", label: "Quốc gia" },
            { key: "clicks", label: "Click" },
            { key: "impression", label: "Lượt hiển thị" },
            { key: "ctr", label: "CTR" },
            { key: "cpc", label: "CPC" },
            { key: "cpm", label: "CPM" },
            { key: "cost", label: "Chi phí" },
          ]}
        />
      );
    },
  },
  // {
  //       id: 'actions',
  //       header: '',
  //       cell: (props) => {
  //         const row = props.row.original
  //         return (
  //           <div className="flex justify-end items-center gap-4">
  //             <button type="button" onClick={() => handleEdit(row)}>
  //               <HiOutlinePencilAlt size={24} />
  //             </button>
  //             <button type="button" onClick={() => handleDelete(row)}>
  //               <HiOutlineTrash size={24} />
  //             </button>
  //           </div>
  //         )
  //       },
  //     },
];
