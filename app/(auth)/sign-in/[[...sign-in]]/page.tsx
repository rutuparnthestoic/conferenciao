
//Here we named the folder as [[...sign-in]]
//This means this page will be rendered for all the routes that match /sign-in
//Eg, /sign-in, /sign-in?redirectasxfa, /sign-in/step1.
//The ... will capture all the path segments into an array 'sign-in'.
//In next js, folders with [[]] are Catch-all routes.

import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
        <SignIn />
    </main>
  )
}

export default SignInPage