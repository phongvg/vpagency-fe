export default function LeaderboardList() {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-3 w-[400px] max-w-[400px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='flex items-center bg-neutral-700/50 p-3 rounded-lg'>
            <div className='w-6 font-bold text-[13px] text-center'>{index + 4}</div>
            <div className='flex items-center gap-3'>
              <img src={`https://i.pravatar.cc/150?img=${index + 1}`} alt={`User ${index + 1}`} className='rounded-full w-8 h-8' loading='lazy' />
              <span className='font-medium'>User {index + 1}</span>
            </div>
            <div className='ml-auto font-bold text-primary'>{50 - index * 10} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
}
