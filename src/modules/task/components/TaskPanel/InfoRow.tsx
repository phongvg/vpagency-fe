interface InfoRowProps {
  label: string;
  value: string | number | React.ReactNode;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-muted-foreground'>{label}</span>
      <span className='font-medium'>{value ?? "N/A"}</span>
    </div>
  );
}
