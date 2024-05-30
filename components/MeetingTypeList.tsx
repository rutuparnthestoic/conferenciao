'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined>()
    const router = useRouter();
    const {user} = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
      dateTime: new Date(),
      description: '',
      link: ''
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast();

    const createMeeting = async () => {
      if(!client || !user) return;

      try{
        if(!values.dateTime){
          toast({
            title: "Please select a date and time"
          })
          return;
        }

        const id = crypto.randomUUID();
        const call = client.call('default', id);
        if(!call) throw new Error('Failed to create new call')

        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
        const description = values.description || 'Instant Meeting'
        

        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description
            }
          }
        })

        setCallDetails(call);

        if(!values.description) {
          router.push(`/meeting/${call.id}`)
          toast({
            title: "Meeting created"
          })
        }

      } catch(err){
        console.log(err)
        toast({
          title: "Failed to create meeting",
          
        })
      }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
       <HomeCard 
       title='New Meeting'
       icon='public/icons/add-meeting.svg'
       desc='Start an instant meeting'
       color='bg-orange-1'
       handleClick={() => setMeetingState('isInstantMeeting')}
       />
       <HomeCard 
       title='Join Meeting'
       icon='public/icons/join-meeting.svg'
       desc='via an invitation link'
       color='bg-blue-1'
       handleClick={() => setMeetingState('isJoinMeeting')}
       />
       <HomeCard 
       title='Schedule Meeting'
       icon='public/icons/schedule.svg'
       desc='for later'
       color='bg-purple-1'
       handleClick={() => setMeetingState('isScheduleMeeting')}
       />
       <HomeCard 
        title='View Recordings'
        icon='public/icons/recordings.svg'
        desc='Past recordings'
        color='bg-yellow-1'
        handleClick={() => router.push('/recordings')}
       />


    {/* Here we are doing this for schedule meeting option. First it will show create meeting
    Where two text boxes will be there to add desc and time for the meeting.
    And once the meeting is created, we will see the copy link button.
    */}
    {!callDetails ? (
      <MeetingModal 
      isOpen={meetingState === 'isScheduleMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Create Meeting"
      handleClick={createMeeting}
      >
        <div className='flex flex-col gap-2.5'>
          <label className='text-base text-normal leading-[22px] text-sky-2'>
            Add a description
          </label>
          <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0'
          onChange={(e) => {
            setValues({...values, description: e.target.value})
          }}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
        <label className='text-base text-normal leading-[22px] text-sky-2'>
            Select date and time
          </label>
          <ReactDatePicker 
          selected={values.dateTime}
          onChange={(date) => setValues({...values, dateTime: date!})}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          timeCaption='Time'
          dateFormat='MMMM d, yyyy h:mm aa'
          className='w-full rounded bg-dark-3 p-2 focus:outline-none'
          />

        </div>
      </MeetingModal>
      ) : (
        <MeetingModal 
           isOpen={meetingState === 'isScheduleMeeting'}
           onClose={() => setMeetingState(undefined)}
           title="Meeting Created"
           className='text-center'
           handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({title: 'Link Copied'})
           }}
           image='/public/icons/checked.svg'
           buttonIcon='/public/icons/copy.svg'
           buttonText='Copy Meeting Link'
        />
      )
    }
    <MeetingModal 
    isOpen={meetingState === 'isInstantMeeting'}
    onClose={() => setMeetingState(undefined)}
    title="Start an Instant Meeting"
    className='text-center'
    buttonText="Start Meeting"
    handleClick={createMeeting}
    />
    
    <MeetingModal 
    isOpen={meetingState === 'isJoinMeeting'}
    onClose={() => setMeetingState(undefined)}
    title="Enter the meeting link"
    className='text-center'
    buttonText="Join Meeting"
    handleClick={() => router.push(values.link)}

    >
      <Input 
      placeholder='Meeting link'
      className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
      onChange={(e) => setValues({...values, link: e.target.value})}
      />
    </MeetingModal>

    </section>
  )
}

export default MeetingTypeList