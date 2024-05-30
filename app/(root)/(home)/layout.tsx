//This layout.tsx defines a wrapper component or global layout for every page in the web application.
//It accepts children passed as props, here children are react elements that are written in page.tsx file for each folder.
//In this global layout.tsx we define the global structure of our website. Everything other than children will be same for each page.


import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react' 

//ReactNode : Type def for TS. All types of react elements.

export const metadata: Metadata = {
  title: "Conferenciao",
  description: "Video conferencing application",
  icons:{
    icon: '/public/icons/logo.png'
  }
};


const HomeLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className='relative'>
        <Navbar />

        <div className='flex'>
            <Sidebar />
        

        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
            <div className='w-full'>
              {children}
            </div>
        </section>
        </div>
        
    </main>
  )
}

export default HomeLayout