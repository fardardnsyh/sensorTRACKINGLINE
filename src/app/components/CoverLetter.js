import React from 'react'

function CoverLetter(props){

  const  {createdAt, companyName, companyAddressOne, companyAddressTwo, greeting, paragraphOne, paragraphTwo, paragraphThree,} = props
  return (
    <>
      <div className="flex flex-col border xs:bg-red w-[87mm] md:w-[110mm] lg:w-[105mm] p-8 pt-16  h-[130mm] text-[0.5rem] shadow-lg rounded-md">
        {/* Section one */}
        <section className="flex justify-between flex-wrap">
          <div className=" flex flex-col justify-between">
            <h1 className="text-xs font-bold text-[#0B58F4]">{'Nicholas Okeke'}</h1>
            <p className="font-bold">Frontend Developer</p>
          </div>
          <div className="flex flex-col justify-between">
            <p>{'linkedIn.com/nicholas-okeke'}</p>
            <p>{'nicholas.okeke87@gmail.com'}</p>
            <p>{'+234-8163565148'}</p>
          </div>
        </section>
        <hr className="border-t-[0.15rem] opacity-50 border-[#0f47b68a]  mt-[0.5rem] mb-[2rem]" />

        {/* Section two */}
        <section className="flex flex-col gap-y-2">
          {/* Company's Adress */}
          <div>
            <p>{ createdAt}</p>
            <p>{ companyName }</p>
            <p>{ `${companyAddressOne} ${companyAddressTwo}`}</p>
          </div>

          <p className="text-[#0B58F4] font-bold my-2">{`${greeting.includes(`${'Dear'.toLocaleLowerCase()}`) ?greeting : `Dear ${greeting}`},`}</p>

          {/* Paragraph 1 */}
          <p>
            {paragraphOne}
          </p>
          {/* Paragraph 2 */}
          <p>
            { paragraphTwo}
          </p>
          {/* Paragraph 3 */}
          <p>
            {paragraphThree}
          </p>

          {/* Conclusion */}
          <p>
            {`Best wishes,`}
          </p>
          {/* Writer's name */}
          <p>
            {`Nicholas`}
          </p>
        </section>
      </div>
    </>
  )
}

export default CoverLetter
