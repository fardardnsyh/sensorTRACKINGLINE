"use client";
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Link from 'next/link'
import { letterDBKey, getDBData, saveDBData } from "./util";
import CoverLetter from './components/CoverLetter';
import Image from 'next/image';
import Loader from './components/Loader';

function Dashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(typeof localStorage !== 'undefined'? localStorage.getItem("isMenuOpen") === "true": null)
    const [isLoading, setIsLoading] = useState(true)
    const [currentDB, setCurrentDB] = useState(null)

    

    function showMenu() {
        setIsMenuOpen(true)
        localStorage.setItem("isMenuOpen", "true")
    }
    function closeMenu() {
        setIsMenuOpen(false)
        localStorage.setItem("isMenuOpen", "false")
    }

    async function fetchLettersData() {
            const data = await getDBData(letterDBKey)
            return data
    }

    useEffect(() => {
        async function getCurrentDB() {
            const currentLettersData = await fetchLettersData()
            setCurrentDB(currentLettersData)
            setTimeout(()=>{
                setIsLoading(false)
            }, 2000)
        }

        getCurrentDB()

    }, [])


    return (
        <>
            <main className="flex min-h-screen">
                {/* Section one */}
                <section className={`w-[50%] md:w-[28%] px-2 fixed lg:flex lg:static z-10 lg:z-0  lg:w-[20%]  2xl:px-2 bg-[#163677] min-h-screen flex-col items-center gap-y-10 ${isMenuOpen ? "flex" : "hidden"}`}>
                    <button
                        onClick={closeMenu}
                        className={`border border-white self-end`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white lg:hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <div className='flex'>
                        <Image width={48} height={48} src="https://res.cloudinary.com/dtduf2ehv/image/upload/v1705192985/samples/oo3nspjcwzd8mbvjeowh.jpg" alt="Logo" className='rounded-full' />

                        <span className='text-white font-semibold self-center'>CVSTUDIO</span>

                    </div>
                    <button >
                        <Link href={'/preview-page'} className="bg-[#0B58F4] px-3 py-2 rounded-md text-white flex gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span className="text-sm">
                                New Cover Letter
                            </span>
                        </Link>
                    </button>

                    <div className="flex gap-x-3 px-5 py-2 rounded-md bg-[#07070730]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#0B58F4] font-heavy">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>

                        <span className="text-white text-sm">My Dashboard</span>
                    </div>
                </section>



                {/* Section 2 */}
                <section className="w-full overflow-auto lg:overflow-visible">
                    {/* Header */}
                    <Header title={'My Dashboard'} email={'nicholas.okeke87@gmail.com'} showMenu={showMenu} />
                    <div className="bg-[#cbdaf10f] w-full min-h-screen lg:px-16 pt-12 md:mx-0">
                        {/* Document Buttons */}
                        <div className="bg-[#80ABED0F] py-1 flex gap-x-1 w-[14.5rem] rounded-md mb-8 mx-auto lg:mx-0">
                            <button className="px-4 py-2 rounded-md">
                                Resume
                            </button>
                            <button className="px-4 py-2 bg-[white] rounded-md">
                                Cover Letter
                            </button>
                        </div>

                        {isLoading? 
                        (<section className='flex flex-col gap-4 mx-8 lg:mx-0'>
                            <Loader />
                            <Loader />
                            <Loader />
                        </section>):
                        
                        (<section className="flex flex-col items-center justify-center lg:items-start lg:flex-row lg:justify-between xl:gap-16 xl:justify-start flex-wrap gap-y-8">
                            <Link href={'/preview-page'} className="xs:bg-red w-[87mm] md:w-[110mm] lg:w-[105mm] p-8 pt-16 border h-[130mm] text-sm shadow-lg rounded-md flex justify-center items-center bg-slate-200" >
                                <div className='flex flex-col justify-center items-center gap-y-4 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#0B58F4]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>

                                    <span className='text-lg text-slate-800'>
                                        Create Cover Letter
                                    </span>
                                </div>
                            </Link>

                            {/* Other dynamic content */}
                            {currentDB?.map(letter => {
                                return (
                                    <CoverLetter
                                        key={letter.id}
                                        createdAt={(new Date(letter.createdAt)).toDateString()}
                                        companyName={letter.companyName}
                                        companyAddressOne={letter.companyAddressOne}
                                        companyAddressTwo={letter.companyAddressTwo}
                                        greeting={letter.greeting}
                                        paragraphOne={letter.paragraphOne}
                                        paragraphTwo={letter.paragraphTwo}
                                        paragraphThree={letter.paragraphThree}
                                    />)
                            })}
                        </section>)}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard
