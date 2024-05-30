'use client'

//Flex classname allows the components within to share space amongst the div.
//If flex-1 is given then all the elements will take 1 part of the whole div.
//If flex-1 and flex-2 is given for lets say two elements then the first one will take 

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    //usePathname provides with the current path as a string. 
    //Eg. if we are in zoom.com/meeting, output will be '/meeting'
    const pathname = usePathname();

  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((link) => {
                //Here in the or, we add dynamic because startsWith will take home '/' for all the other paths, hence coloring Home always. So we add starts with : 'route/' instead of normal startsWith.
                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`); //Gives a boolean value True if the current link is active, false if not.
                return (
                    <Link 
                    href={link.route}
                    key={link.label}
                    //The 'cn' comes from shadcn, equivalent to className. Just the difference is we can add conditional classNames easily.
                    //Here, it applies blue only to that link which is active and for knowing which is active we have the isActive component.
                    className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                        'bg-blue-1': isActive
                    })}
                    >
                    <Image 
                    src={link.imgUrl}
                    alt={link.label}
                    width={24}
                    height={24}
                    />
                    <p className='text-lg font-semibold max-lg:hidden'>
                        {link.label}
                    </p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar