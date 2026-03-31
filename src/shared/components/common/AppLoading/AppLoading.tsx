import Lottie from 'lottie-react';
import marioLoadingData from '@/assets/mario-loading.json';

interface AppLoadingProps {
  loading?: boolean;
}

export default function AppLoading({ loading = false }: AppLoadingProps) {
  if (!loading) return null;

  return (
    <div className='app-loader'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center'>
        <div className="relative flex flex-col items-center w-[300px] h-[300px]">
          <Lottie
            animationData={marioLoadingData}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
          <span className='absolute bottom-20 text-center uppercase text-white drop-shadow-md'
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px", letterSpacing: "0.2rem" }}>
            VP Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
