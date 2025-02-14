import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return <header className="navbar bg-base-200 shadow-md w-full z-50">
    <div className="w-90% mx-5% flex items-center justify-between">
      <div className="flex-1">
        <Link href={'/'} className="btn btn-ghost normal-case text-3xl font-bold text-veganDarkGreen">
          Veg<Image className="-mx-2" src={'/images/logo.png'} alt="" width={320} height={320} style={{width:'40px', height: 'auto'}}/>n?
        </Link>
       
      </div>

      <nav className="flex space-x-4">
        <Link href={'/about'} className="btn btn-ghost normal-case text-2xl text-veganDarkGreen">
          About
        </Link>
      </nav>
    </div>
  </header>
}