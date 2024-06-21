import React from 'react'
import Image from 'next/image'

const NavbarComponent = () => {
    return (
        <div className='grid grid-cols-2'>
            <div className='col-span-1 flex justify-start ps-12'>
                <Image
                    src="/hplogo.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    priority
                />
            </div>
        </div>
    )
}

export default NavbarComponent
