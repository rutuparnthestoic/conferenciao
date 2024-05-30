import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';


//Typedef for layout useState, indicates different types of layout for meeting room.
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();

  // 'personal' -> !'personal' => false -> !false => true. (!! when case is true)
  // undefined -> !undefined => true -> !true => false. (!! when case is false.)

  const router = useRouter();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left') //State for selecting layout, by default it is speaker left
  const [showParticipants, setShowParticipants] = useState(false); //Showing participants or not for Call list from stream io


  //These 3 lines are used for diplaying a Loader if user is still joining i.e user is stuck between setup and meeting room

  //useCallStateHooks return all the hooks related to call state, one of which is Calling state.
  const {useCallCallingState} = useCallStateHooks();
  //Calling state returns if the user is JOINED, JOINING, LEFT and much more.
  const callingState = useCallCallingState();

  //If the user has not yet jouined, show loader, if joined then show the rest functionality like buttons and room.
  if(callingState != CallingState.JOINED) return <Loader />


  //Switch case function which sets the layout as per input.
  const CallLayout = () => {
    switch (layout) {
      case 'grid' :
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />
      default :
        return <SpeakerLayout participantsBarPosition="right" /> 
      }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          {/* Call layout component function which sets the layout as per input. */}
          <CallLayout /> 
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block': showParticipants})}>
          {/* show-block is a custome boolean property that is based on the showParticipants hook, which is either true or false, meaning show or hide participant list. */}
          {/* CallParticipantList comes from stream io, the component that shows the participants list with various function. On closing this we set the hook to false. */}
          <CallParticipantsList onClose={() => setShowParticipants(false)}/>
        </div>
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        {/* This is the default call controls, such as mic cam etc. We import default predef style for this page from stream io itself. */}
        <CallControls 
        onLeave={() => {
          router.push('/');
        }}
        />

      {/* Dropdown menu for selecting the layout. Dropdown menu comes from Shad cn. */}
      <DropdownMenu>
        <div className='flex items-center'>
          {/* Trigger that triggers the dropdown menu, usually a button or clickable icon */}
          <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            {/* Layout list is basically an icon coming from lucide react */}
          <LayoutList size={20} className='text-white'/>
        </DropdownMenuTrigger>
        </div>
        
        {/* Content for dropdown, can contain Lable, and different items. */}
        <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
          <DropdownMenuLabel>Select Layout</DropdownMenuLabel>
          <DropdownMenuSeparator className="border-dark-1"/>
          
          {/* Mapping over the three layout types, then setting the layout */}
          {['Grid', 'Speaker-left', 'Speaker-right'].map((item, index) => (
            <div key={index}>
              <DropdownMenuItem className='cursor-pointer' 
              onClick={() => {
                //Here we set the layout by converting the item from array to lower case, as in function all are lowercase.
                //And as we are using TS, we need to set them as the Type we defined as the default type would've been string,
                //But the layout takes only CallLayoutType type.
                setLayout(item.toLowerCase() as CallLayoutType)
              }}
              >{item}</DropdownMenuItem>
              <DropdownMenuSeparator 
              className="border-dark-1"
              />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Component from stream io that shows all the stream stats. */}
      <CallStatsButton />

      {/* This button toggles the show participants hook, which in turn triggers the CallParticipantsList. */}
      <button onClick={() => setShowParticipants((prev) => !prev)}>
        <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
          <Users size={20} className='text-white'/>
        </div>
      </button>
      {!isPersonalRoom && <EndCallButton />}
      </div>

    </section>
  )
}

export default MeetingRoom