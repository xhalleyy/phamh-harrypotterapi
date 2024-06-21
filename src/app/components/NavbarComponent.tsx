'use client'
import React, { useState } from 'react'
import Image from 'next/image'

type NavbarProps = {
    searchName:string
    setSearchName: React.Dispatch<React.SetStateAction<string>>
    handleCharacterInfo: ()=> void
}

const NavbarComponent = ({searchName, setSearchName, handleCharacterInfo}: NavbarProps) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleCharacterInfo();
        }
      };

    return (
        <div className='flex justify-end'>
            <div className='flex justify-center lg:justify-start items-center'>
                <div className='bg-white rounded-lg border-2 border-black'>
                    <input onKeyDown={handleKeyDown} value={searchName} onChange={(e) => setSearchName(e.target.value)} type="text" placeholder="Enter a Character" className='font-kodchasan-semi text-xl md:text-2xl lg:text-xl xl:text-3xl ps-1 xl:ps-2 text-gray-400 w-44 md:w-56 lg:w-44 xl:w-72 xl:h-10 rounded-lg' />
                </div>
                <div onClick={handleCharacterInfo} className='cursor-pointer bg-yellow-200 border-2 border-black px-2 rounded-md mx-1 md:mx-3'>
                    <p className='font-kodchasan-medium lg:text-xl xl:text-3xl text-2xl hidden lg:block' >Search</p>
                </div>
            </div>

            <div className='ps-8 pe-8 py-6'>
                <Image
                    src="/Wizarding_World_Logo.webp"
                    width={160}
                    height={160}
                    alt="Picture of the author"
                    priority
                />
            </div>
        </div>
    )
}

export default NavbarComponent
