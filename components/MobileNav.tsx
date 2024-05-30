'use client'
//Using 'Sheet' shadcn component to implement navbar for mobile.

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
  



const MobileNav = () => {
    const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
            {/* Here asChild property helps us render our trigger component instead of the default button. */}
            {/* Sheettrigger wraps up the content in the trigger into a button component. Here we dont want that. Hence to just render the image, we give asChild. */}
           <SheetTrigger asChild>   
            {/* Button that triggers the Sheet component */}
            <Image 
            src="public/icons/hamburger.svg"
            alt="hamburger icon"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
            />
           </SheetTrigger>
           <SheetContent side="left" className="border-none bg-dark-1">
           <Link
            href="/"
            className='flex items-center gap-1'
            >
             <Image 
               src="public/icons/logo.svg"
               width={32}
               height={32}
               alt='logo'
               className='max-sm:size-10'
              />
                <p className='text-[26px] font-extrabold text-white'>
                  VCRoom
                </p>
            </Link>

            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                <section className="flex h-full gap-6 pt-16 text-white flex-col">
                    {sidebarLinks.map((link) => {
                const isActive = pathname === link.route; //Gives a boolean value True if the current link is active, false if not.

                return ( //Same content as for the normal Side bar.
                //Anything that is rendered in the SheetClose component, closes the sheet when clicked.
                <SheetClose asChild key={link.route}>
                    <Link 
                    href={link.route}
                    key={link.label}
                    //The 'cn' comes from shadcn, equivalent to className. Just the difference is we can add conditional classNames easily.
                    //Here, it applies blue only to that link which is active and for knowing which is active we have the isActive component.
                    className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                        'bg-blue-1': isActive
                    })}
                    >
                    <Image 
                    src={link.imgUrl}
                    alt={link.label}
                    width={20}
                    height={20}
                    />
                    <p className='font-semibold'>
                        {link.label}
                    </p>
                    </Link>
                </SheetClose>
                )
            })}
                </section>
            </div>
          </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav