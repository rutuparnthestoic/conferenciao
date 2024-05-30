import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
  const date = now.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className="h-[300px] w-full rounded-[20px]  bg-hero bg-cover">
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 md:p-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming Meeting at: 12:30PM
          </h2>

          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold md:text-5xl lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 md:text-xl lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>

      {/* In order for us to implement the 4 options, they will be Client side rendered */}
      {/* As they will need Client input they should be rendered on client side. */}
      {/* Here we create a separate component for client side rendering and render the rest of the page on server side*/}
      <MeetingTypeList />

    </section>
  )
}

export default Home