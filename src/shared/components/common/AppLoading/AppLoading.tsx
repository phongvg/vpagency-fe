import { Spinner } from "@/shared/components/ui/spinner";

interface AppLoadingProps {
  loading?: boolean;
}

export default function AppLoading({ loading = false }: AppLoadingProps) {
  if (!loading) return null;

  return (
    <div className='app-loader'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
        <div className='flex items-center gap-2'>
          <Spinner className='size-6' />
          <span className='uppercase tracking-[.25rem] font-semibold'>Loading...</span>
        </div>
      </div>
    </div>
  );
}
