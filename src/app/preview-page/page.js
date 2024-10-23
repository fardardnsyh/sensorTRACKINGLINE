"use client";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { letterDBKey, getDBData, saveDBData } from "../util";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import Loader from "../components/Loader";


function PreviewPage() {
    const [isloading, setIsLoading] = useState(true);
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [companyName, setCompanyName] = useState("");
    const [companyAddressOne, setCompanyAddressOne] = useState("");
    const [companyAddressTwo, setCompanyAddressTwo] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [greeting, setGreeting] = useState("");
    const [paragraphOne, setParagraphOne] = useState("");
    const [paragraphTwo, setParagraphTwo] = useState("");
    const [paragraphThree, setParagraphThree] = useState("");
    const [closing, setClosing] = useState("");
    const [currentLetter, setCurrentLetter] = useState(null)
    // const [letterData, setLetterData] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(typeof localStorage !== 'undefined'? localStorage.getItem("isPreviewMenuOpen") === "true": null)



    const title = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
  </svg><span>Create Cover Letter</span>
  `

    function handleRadioChange(event) {
        setSelectedValue(event.target.value);
    };

    async function fetchLetterData() {
        const data = await getDBData('currentData')
        if (Array.isArray(data)) {
            return null
        }
        return data
    }

    useEffect(() => {
        async function getCurrentData() {
            const recentLetterData = await fetchLetterData()
            setCurrentLetter(recentLetterData)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }

        getCurrentData()

    }, [])

    function showMenu() {
        setIsMenuOpen(true)
        localStorage.setItem("isPreviewMenuOpen", "true")
    }
    function closeMenu() {
        setIsMenuOpen(false)
        localStorage.setItem("isPreviewMenuOpen", "false")
        
    }

    async function handleSubmit(event) {
        try {
            event.preventDefault()

            setIsButtonLoading(true)

            const singleLetterDetail = {
                id: uuidv4(),
                companyName,
                companyAddressOne,
                companyAddressTwo,
                selectedValue,
                greeting,
                paragraphOne,
                paragraphTwo,
                paragraphThree,
                closing,
                createdAt: Date.now()
            }

            const storedLetterData = await getDBData(letterDBKey)
            storedLetterData.push(singleLetterDetail)
            saveDBData(letterDBKey, storedLetterData)
            saveDBData('currentData', singleLetterDetail)
            setCurrentLetter(singleLetterDetail)

            setIsButtonLoading(false)

            Swal.fire({
                title: "Success!",
                text: `Letter created successfully!`,
                icon: "success",
                confirmButtonText: "ok",
            })

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `${error.message}`,
                icon: "error",
                confirmButtonText: "ok",
            })
        }
    }

    // Delete a generated cover letter
    async function deleteACoverLetter() {
        try {
            const currentCoverLetter = await getDBData('currentData');

            if (currentCoverLetter.length === 0) {
                await Swal.fire({
                    title: "Error!",
                    text: `Cover letter does not exist!`,
                    icon: "error",
                    confirmButtonText: "ok",
                })
                return;
            }

            const confirmResult = await Swal.fire({
                title: "Warning!",
                text: `Would you like to delete this cover letter?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ok",
                cancelButtonText: "cancel"
            });

            if (!confirmResult.isConfirmed) {
                return;

            }


            const currentId = currentCoverLetter.id;

            // Get the letter database
            const coverLetterDB = getDBData(letterDBKey);
            const newCoverLetterDB = coverLetterDB.filter(coverletter => coverletter.id !== currentId);

            saveDBData('currentData', '');
            saveDBData(letterDBKey, newCoverLetterDB);
            setCurrentLetter(null)

            setIsLoading(true)


            await Swal.fire({
                title: "Success!",
                text: `Letter deleted successfully!`,
                icon: "success",
                confirmButtonText: "ok",
            });


            setTimeout(() => {
                setIsLoading(false)
            }, 2000)

        } catch (error) {
            await Swal.fire({
                title: "Error!",
                text: `${error.message}`,
                icon: "error",
                confirmButtonText: "ok",
            });
        }
    }



    return (
        <main className="flex">

            {/* Section 1 */}
            <section className={`xs:w-[20%] w-[17%] lg:w-[7%] lg:flex  flex-col items-center gap-y-8 bg-[#163677]  ${isMenuOpen ? 'flex' : 'hidden'}`}>
                <button
                    onClick={closeMenu}
                    className={`border border-white self-end`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white lg:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <Image src="https://res.cloudinary.com/dtduf2ehv/image/upload/v1705192985/samples/oo3nspjcwzd8mbvjeowh.jpg" width={24} height={24} alt="Logo" className='w-[2.5rem] h-[2.5rem] rounded-full' />
                <button className="bg-[#0B58F4] px-4 py-2 text-center text-white rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </button>
            </section>

            {/* Section 2 */}
            <section className="w-full bg-[#F8FAFE] border border-black">
                {/* Header */}
                <Header title={title} email={'nicholas.okeke87@gmail.com'} showMenu={showMenu} />

                {/* section 2a */}
                <div className="flex flex-col lg:flex-row px-10 w-full">
                    {/* Section 2a1 */}
                    <section className="w-1/2 py-5 pr-10 w-full lg:w-1/2">
                        <h1 className="mb-4">Cover Letter For Design</h1>

                        {/* Preview of the generated letter */}
                        <div className="flex flex-col w-full max-w-2xl mx-auto px-8 pb-16 md:pb-8 pt-16 border h-auto md:h-[245mm] text-sm shadow-lg rounded-md">
                            {/* Section one */}
                            {isloading ?
                                <section>
                                    <Loader />
                                </section> :

                                (<section className="flex justify-between flex-wrap">
                                    <div className=" flex flex-col justify-between">
                                        <h1 className="text-xl font-bold text-[#0B58F4]">{'Nicholas Okeke'}</h1>
                                        <p className="font-bold">Frontend Developer</p>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p>{'linkedIn.com/nicholas-okeke'}</p>
                                        <p>{'nicholas.okeke87@gmail.com'}</p>
                                        <p>{'+234-8163565148'}</p>
                                    </div>
                                </section>)}

                            <hr className="border-t-[0.2rem] opacity-30 border-[#114abd8a] mt-[1rem] mb-[4rem]" />

                            {/* Section two */}
                            {isloading ?

                                (<section className="flex flex-col gap-2">
                                    <Loader />
                                    <Loader />
                                    <Loader />
                                </section>) :

                                (<section className="flex flex-col gap-y-7">
                                    {/* Company's Adress */}
                                    <div>
                                        <p>{currentLetter ? (new Date()).toDateString() : `[Today's Date]`}</p>
                                        <p>{currentLetter ? currentLetter.companyName : `[Company Name]`}</p>
                                        <p>{currentLetter ? `${currentLetter.companyAddressOne} ${currentLetter.companyAddressTwo}` : `[Company Mailing Address]`}</p>
                                    </div>

                                    <p className="text-[#0B58F4] my-2 font-bold">{currentLetter ? `${currentLetter.greeting.includes(`${'Dear'.toLocaleLowerCase()}`) ? currentLetter.greeting : `Dear ${currentLetter.greeting}`},` : `Dear [name],`}</p>

                                    {/* Paragraph 1 */}
                                    <p>
                                        {currentLetter ? currentLetter.paragraphOne : 'Opening paragraph: Et vel malesuada dolor sed diam. Aliquam habitasse pellentesque viverra elementum, habitant donec interdum facilisis sit.'}
                                    </p>
                                    {/* Paragraph 2 */}
                                    <p>
                                        {currentLetter ? currentLetter.paragraphTwo : 'Body paragraphs: Eu, elit a aenean placerat libero at diam eget pharetra. Viverra est arcu suspendisse ac dictum maecenas. Maecenas at interdum egestas et diam facilisis vestibulum vestibulum. Varius in nulla tincidunt lacus, neque consectetur. Nibh nisl adipiscing tempus euismod. Eget posuere neque tristique enim non pellentesque eu facilisi.'}
                                    </p>
                                    {/* Paragraph 3 */}
                                    <p>
                                        {currentLetter ? currentLetter.paragraphThree : 'Closing paragraph: Enim sociis dui fermentum eu. Auctor sit volutpat netus nec volutpat sit pharetra mauris. Et aliquam vivamus sed iaculis tincidunt tincidunt libero lectus. Nibh nibh elementum, nisi, vestibulum sed vulputate quisque diam tristique. A volutpat in quis felis cursus.'}
                                    </p>

                                    {/* Conclusion */}
                                    <p>
                                        {`Best wishes,`}
                                    </p>
                                    {/* Writer's name */}
                                    <p>
                                        {`Nicholas`}
                                    </p>
                                </section>)}
                        </div>
                    </section>
                    {/* Section 2b2 */}
                    <section className="flex flex-col gap-y-5 py-5 lg:w-1/2 pl-12 bg-[white] w-full">
                        <header className="flex justify-between flex-wrap gap-3 lg:gap-1">
                            <h1 className="w-[90%] text-center border border-slate-200 py-3 bg-[#F8FAFE] rounded-md flex items-center justify-center">Letter Body</h1>
                            <button className="bg-[#163677] px-4 py-4 text-center text-white rounded-md self-center"
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                            </button>
                        </header>
                        <div className="w-full flex justify-end">
                            <button className="flex gap-x-3"
                                onClick={deleteACoverLetter}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 self-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                                <span>
                                    Delete
                                </span>
                            </button>
                        </div>

                        {/* Input form for the letter */}
                        <form className="grid grid-cols-1 lg:grid-cols-3 text-md"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4 col-span-3">
                                {/* Company Name */}

                                <input
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    placeholder="Company Name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-3">
                                {/* Company Address */}
                                <input
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    placeholder="Company Address: Street"
                                    value={companyAddressOne}
                                    onChange={(e) => setCompanyAddressOne(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-3">
                                {/* Company address: city */}
                                <input
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 "
                                    type="text"
                                    placeholder="Company Address: City"
                                    value={companyAddressTwo}
                                    onChange={(e) => setCompanyAddressTwo(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Letter body type */}

                            <div className="mb-4 col-span-3 flex justify-between flex-wrap">
                                <span
                                    className="font-bold text-gray-700"
                                >
                                    Letter Body type
                                </span>

                                <div className="flex gap-x-8 flex-wrap">

                                    <div className="flex gap-x-3">
                                        <input
                                            className="border text-gray-700 focus:outline-none focus:border-blue-500 border border-black w-4 "
                                            type="radio"
                                            name="body-type"
                                            value={'Recommended'}
                                            checked={selectedValue === 'Recommended'}
                                            onChange={handleRadioChange}
                                            required
                                        />
                                        <label
                                            className="font-bold text-gray-700"
                                            htmlFor="experience"
                                        >
                                            Recommended
                                        </label>
                                    </div>

                                    <div className="flex gap-x-3">
                                        <input
                                            className="border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 border border-black w-4"
                                            type="radio"
                                            name="body-type"
                                            value={'Free Form'}
                                            checked={selectedValue === 'Free Form'}
                                            onChange={handleRadioChange}
                                            required
                                        />
                                        <label
                                            className="font-bold text-gray-700"
                                            htmlFor="experience"
                                        >
                                            Free Form
                                        </label>
                                    </div>

                                </div>

                            </div>

                            {/* Greeting of the letter */}
                            <div className="mb-4 col-span-3">
                                <input
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    placeholder="Greeting"
                                    value={greeting}
                                    onChange={(e) => setGreeting(e.target.value)}
                                    required
                                />
                            </div>

                            {/* 1st paragraph */}
                            <div className="mb-4 col-span-3">
                                <textarea
                                    className="w-full px-3 py-2 h-[8rem] border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    placeholder="1st Paragraph: Briefly introduce Yourself"
                                    value={paragraphOne}
                                    onChange={(e) => setParagraphOne(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            {/* Second Paragraph */}
                            <div className="mb-4 col-span-3">
                                <textarea
                                    className="w-full px-3 py-2 h-[8rem] border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    placeholder="2nd Paragraph:Why You? Why this Company?"
                                    value={paragraphTwo}

                                    onChange={(e) => setParagraphTwo(e.target.value)}
                                    required
                                ></textarea>

                            </div>

                            {/* Third paragraph */}
                            <div className="mb-4 col-span-3">
                                <textarea
                                    className="w-full px-3 py-2 h-[8rem] border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    placeholder="3rd Paragraph:Call to action"
                                    value={paragraphThree}
                                    onChange={(e) => setParagraphThree(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            {/* Closing */}
                            <div className="mb-4 col-span-3">
                                <input
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    placeholder="Closing"
                                    value={closing}
                                    onChange={(e) => setClosing(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Generate button */}
                            <div className="flex justify-center mt-7 col-span-3">
                                <button
                                    className="text-xs lg:text-[1rem]  bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    {isButtonLoading ? "loading...Please wait" : "Generate Cover Letter"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

            </section>
        </main>
    )
}

export default PreviewPage
