import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

interface HomeCardProps {
    color: string;
    title: string;
    icon : string;
    desc : string;
    handleClick: () => void;
}

const HomeCard = ({ color, title, icon, desc, handleClick}: HomeCardProps) => {
  return (
    <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', color)}
    onClick={handleClick}
    key={title}
    >
        <div className='flex-center glassmorphism size-12 rounded-[10px]'>
            <Image 
            src={icon}
            alt={title}
            width={27}
            height={27}
            />
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-lg font-normal'>{desc}</p>
        </div>

    </div>
  )
}

export default HomeCard