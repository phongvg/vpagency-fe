import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/shared'
import { formatUSD } from '@/helpers/formatUSD'

const MOCK_DATA = [
  {
    id: 1,
    totalSpend: 15420000,
    totalClicks: 8500,
    avgCPC: 1814,
    bid: 2000,
    country: 'Vietnam',
    countryCPC: 1750,
    countrySpend: 12500000,
    refs: 340,
    costPerRef: 45353,
    refClickRate: 4.0,
    ftd: 25,
    costPerFTD: 616800,
    ftdRefRate: 7.35,
    volumePerDay: 10000,
    estimatedRefsPerDay: 400,
    clickVolumePercent: 85.0,
    refVolumePercent: 85.0,
  },
  {
    id: 2,
    totalSpend: 22350000,
    totalClicks: 12400,
    avgCPC: 1802,
    bid: 2200,
    country: 'Thailand',
    countryCPC: 1820,
    countrySpend: 18500000,
    refs: 496,
    costPerRef: 45060,
    refClickRate: 4.0,
    ftd: 38,
    costPerFTD: 588158,
    ftdRefRate: 7.66,
    volumePerDay: 15000,
    estimatedRefsPerDay: 600,
    clickVolumePercent: 82.67,
    refVolumePercent: 82.67,
  },
  {
    id: 3,
    totalSpend: 8900000,
    totalClicks: 5200,
    avgCPC: 1712,
    bid: 1800,
    country: 'Indonesia',
    countryCPC: 1680,
    countrySpend: 7200000,
    refs: 208,
    costPerRef: 42788,
    refClickRate: 4.0,
    ftd: 15,
    costPerFTD: 593333,
    ftdRefRate: 7.21,
    volumePerDay: 8000,
    estimatedRefsPerDay: 320,
    clickVolumePercent: 65.0,
    refVolumePercent: 65.0,
  },
  {
    id: 4,
    totalSpend: 31200000,
    totalClicks: 16800,
    avgCPC: 1857,
    bid: 2500,
    country: 'Philippines',
    countryCPC: 1900,
    countrySpend: 25600000,
    refs: 672,
    costPerRef: 46429,
    refClickRate: 4.0,
    ftd: 48,
    costPerFTD: 650000,
    ftdRefRate: 7.14,
    volumePerDay: 20000,
    estimatedRefsPerDay: 800,
    clickVolumePercent: 84.0,
    refVolumePercent: 84.0,
  },
  {
    id: 5,
    totalSpend: 12800000,
    totalClicks: 7300,
    avgCPC: 1753,
    bid: 1900,
    country: 'Malaysia',
    countryCPC: 1720,
    countrySpend: 10500000,
    refs: 292,
    costPerRef: 43836,
    refClickRate: 4.0,
    ftd: 21,
    costPerFTD: 609524,
    ftdRefRate: 7.19,
    volumePerDay: 9000,
    estimatedRefsPerDay: 360,
    clickVolumePercent: 81.11,
    refVolumePercent: 81.11,
  },
  {
    id: 6,
    totalSpend: 12800000,
    totalClicks: 7300,
    avgCPC: 1753,
    bid: 1900,
    country: 'Malaysia',
    countryCPC: 1720,
    countrySpend: 10500000,
    refs: 292,
    costPerRef: 43836,
    refClickRate: 4.0,
    ftd: 21,
    costPerFTD: 609524,
    ftdRefRate: 7.19,
    volumePerDay: 9000,
    estimatedRefsPerDay: 360,
    clickVolumePercent: 81.11,
    refVolumePercent: 81.11,
  },
  {
    id: 7,
    totalSpend: 12800000,
    totalClicks: 7300,
    avgCPC: 1753,
    bid: 1900,
    country: 'Malaysia',
    countryCPC: 1720,
    countrySpend: 10500000,
    refs: 292,
    costPerRef: 43836,
    refClickRate: 4.0,
    ftd: 21,
    costPerFTD: 609524,
    ftdRefRate: 7.19,
    volumePerDay: 9000,
    estimatedRefsPerDay: 360,
    clickVolumePercent: 81.11,
    refVolumePercent: 81.11,
  },
]

export default function FinanceReportTable() {
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        id: 'stt',
        header: 'STT',
        accessorKey: 'index',
        cell: (props) => {
          const row = props.row.index
          return <span>{row + 1}</span>
        },
      },
      {
        header: 'Tổng chi tiêu',
        accessorKey: 'totalSpend',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)} đ</span>
        },
      },
      {
        header: 'Tổng lượt click',
        accessorKey: 'totalClicks',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}</span>
        },
      },
      {
        header: 'CPC trung bình',
        accessorKey: 'avgCPC',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Thầu',
        accessorKey: 'bid',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Quốc gia đang cắn',
        accessorKey: 'country',
      },
      {
        header: 'CPC quốc gia',
        accessorKey: 'countryCPC',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Chi tiêu quốc gia',
        accessorKey: 'countrySpend',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Số Ref',
        accessorKey: 'refs',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}</span>
        },
      },
      {
        header: 'Chi phí mỗi Ref',
        accessorKey: 'costPerRef',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Tỷ lệ Ref/Click',
        accessorKey: 'refClickRate',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}%</span>
        },
      },
      {
        header: 'Số FTD',
        accessorKey: 'ftd',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}</span>
        },
      },
      {
        header: 'Chi phí mỗi FTD',
        accessorKey: 'costPerFTD',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{formatUSD(value)}</span>
        },
      },
      {
        header: 'Tỷ lệ FTD/Ref',
        accessorKey: 'ftdRefRate',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}%</span>
        },
      },
      {
        header: 'Volume key/ngày',
        accessorKey: 'volumePerDay',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}</span>
        },
      },
      {
        header: 'Dự tính Ref/ngày',
        accessorKey: 'estimatedRefsPerDay',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}</span>
        },
      },
      {
        header: '% click đạt được so với volume',
        accessorKey: 'clickVolumePercent',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}%</span>
        },
      },
      {
        header: '% Ref đạt được so với dự volume',
        accessorKey: 'refVolumePercent',
        cell: (props) => {
          const value = props.getValue() as number
          return <span>{value}%</span>
        },
      },
    ],
    [],
  )

  return <DataTable columns={columns} data={MOCK_DATA} loading={false} pagingData={undefined} />
}
