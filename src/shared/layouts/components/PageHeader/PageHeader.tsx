import { type LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string | undefined;
  icon?: LucideIcon;
}

export default function PageHeader({ title, icon: Icon }: PageHeaderProps) {
  if (!title) return null;

  return (
    <div className='mb-6'>
      <div className='flex items-center'>
        {Icon && <Icon className='inline-block mr-3 w-12 h-12' />}
        <h1 className='text-5xl font-bold tracking-tight text-white'>{title}</h1>
      </div>
    </div>
  );
}
