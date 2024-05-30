//This layout.tsx defines a wrapper component or global layout for the current folder page in the web application.
//It accepts children passed as props, here children are react elements that are written in page.tsx file for each folder.
//In this global layout.tsx we define the global structure of our website. Everything other than children will be same for each page.


import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react' 

export const metadata: Metadata = {
  title: "Conferenciao",
  description: "Video conferencing application",
  icons:{
    icon: '/public/icons/logo.png'
  }
};

//ReactNode : Type def for TS. All types of react elements.

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout