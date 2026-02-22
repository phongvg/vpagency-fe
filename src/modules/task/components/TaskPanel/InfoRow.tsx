interface InfoRowProps {
  label: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
}

export default function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className='flex justify-between items-center'>
      <span className='flex items-center gap-2 text-muted-foreground'>
        {icon && <span className='flex-shrink-0'>{icon}</span>}
        {label}
      </span>
      <span className='font-medium'>{value ?? "N/A"}</span>
    </div>
  );
}
