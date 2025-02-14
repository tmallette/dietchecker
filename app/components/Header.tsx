import Image from 'next/image';

export function Header() {
  return <header className="navbar bg-base-200 shadow-md w-full z-50">
    <div className="w-90% mx-5% flex items-center justify-between">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-3xl font-bold text-veganDarkGreen">
          Veg<Image className="-mx-2" src={'/images/logo.png'} alt="" width={320} height={320} style={{width:'40px', height: 'auto'}}/>n?
        </a>
      </div>

      <nav className="flex space-x-4">
        <a href="/about" className="btn btn-ghost normal-case text-2xl text-veganDarkGreen">About</a>
      </nav>
    </div>
  </header>
}