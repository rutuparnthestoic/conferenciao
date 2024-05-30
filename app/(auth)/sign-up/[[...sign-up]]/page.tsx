//Here we named the folder as [[...sign-up]]
//This means this page will be rendered for all the routes that match /sign-up
//Eg, /sign-up, /sign-up?redirectasxfa, /sign-up/step1.
//The ... will capture all the path segments into an array 'sign-up'.
//In next js, folders with [[]] are Catch-all routes.

import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
        <SignUp />
    </main>
  )
}

export default SignUpPage