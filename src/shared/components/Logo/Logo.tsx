import logo from "@/assets/vp media (1).png";

export default function Logo() {
  // return <div className='font-bold text-base uppercase'>VP Media</div>;
  return (
    <div className='p-1'>
      <img src={logo} alt='logo' className='p-1 w-1/2 h-1/2' />
    </div>
  );
}
