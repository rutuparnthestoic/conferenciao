'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
//This is a Dynamic route page. [id] here is dynamic, meaning different for each meeting.
//We access this id through params passed as props to the component.

import React, { useState } from 'react'

const Meeting = ({params: {id}}: {params: {id: string}}) => {
  //Getting user from clerk.
  const {user, isLoaded} = useUser();
  //State for checking if setup is complete (mic and all) or not.
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  //Getting calls from the id passed through params.
  const {call, isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader />


  return (
    <main className='h-screen w-full'
    >
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting