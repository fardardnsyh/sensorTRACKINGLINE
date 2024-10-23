import Link from 'next/link';
import parse from 'html-react-parser';
import Image from 'next/image'


const Header = (props) => {
    const {title, email, isMenuOpen, showMenu} = props
  return (
    <>
        <header className='border border-slate-200 w-full flex flex-wrap lg:flex-nowrap justify-between px-4'>
            <div className='self-center flex gap-x-14'>
                 {/* Hamburger */}
                 <div
                    onClick={() => showMenu()}
                    className={`lg:hidden ${isMenuOpen ? 'hidden' : 'block'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>


                <Link href={'/'} className='flex gap-x-3 font-semibold'>
                        {parse(title)}
                </Link>
            </div>

            <div className='flex lg:justify-between gap-x-5 py-3'>
                
                    <Image src="https://res.cloudinary.com/dtduf2ehv/image/upload/v1705113902/j4utweqw9tl7lzlhkkff.jpg" alt="Logo" width={48} height={48} className='rounded-full border border-slate-300' />
                <span className='self-center'>
                    {email}
                </span>
            </div>
        </header>
    </>
  )
}

export default Header
