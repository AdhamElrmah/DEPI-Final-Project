import React from 'react'

const ContactUsInfo = () => {
  return (
    <div> 
      <h2 className='text-[25px] xl:ml-98 sm:ml-13 font-extrabold text-gray-900 text-start mt-20 mb-8'>Contact Details</h2>    <div className='flex justify-center gap-4'>
        <div className='flex flex-col p-5 pb-0 pr-0 container bg-[#474f53] rounded-[10px] text-white w-fit'>
            <h2 className='font-bold text-[17px] mb-1' >Skills Dynamix</h2>
            <ul className='text-[14px] space-y-0.5'>
                <li><p>Roushdy</p></li>
                <li><p>431 El Horreya Rd</p></li>
                <li><p>Alexandria, Egypt</p></li>
            </ul>
            <img src="src\assets\ContactUsPage\AddressIcon.png" 
            className='ml-70'
            width={70}/>
        </div>
      <div className='flex flex-col gap-4 mb-0'>
        <div className='flex flex-col p-5  container bg-[#728189] rounded-[10px] text-white w-fit'>
            <h2 className='font-bold text-[14px]' >+20 12 06515666</h2>
           <div className='flex'>
            <p className='text-[14px]'>Call us</p>
            <img src="src\assets\ContactUsPage\PhoneIcon.png" 
            className='ml-32 '
            width={25}/> </div>
        </div>

        <div className='flex flex-col p-5  container bg-[#728189] rounded-[10px] text-white w-fit'>
            <h2 className='font-bold text-[14px] ' >info@skillsdynamix.com</h2>
            <div className='flex'>
            <p className='text-[13px]'>Send your email</p>
            <img src="src\assets\ContactUsPage\MailIcon.png" 
            className='mt-1 w-4 h-4 ml-21'
            /> </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default ContactUsInfo