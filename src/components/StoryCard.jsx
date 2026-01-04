import React from 'react'
import cookie from '../assets/cookie4.png'

import * as Icon from 'react-feather'
const StoryCard = ({ i, index, story, className, handlePrev, handleNext, width }) => {
    const isActive = i === index
    return (
        <div className={`relative ${isActive ? 'gap-2' : 'text-[10px]'} flex flex-row items-center   ${className} border z-[10] `}>
            {
                /*
                <div className={`${isActive ? 'z-[0]' : 'z-[10]'} absolute w-full h-full flex flex-col justify-center items-center  border transition-all`} >
                <img src={cookie} className={`${isActive ? 'w-0 h-0' : 'w-15 h-15'} rounded-full`} alt="" />
                <span className={`${isActive ? 'hidden' : ''}`}>username</span>
            </div>
                 */
            }

            <img onClick={handlePrev} src={cookie} className={`${isActive ? 'w-15 h-15' : 'w-0 h-0'} cursor-pointer  transition-all duration-300`} alt="" />
            <div className='w-[100%] h-[100%] flex flex-col gap-2 rounded-2xl bg-black'>
                <div className='h-[14%] p-4 flex flex-row items-center gap-4 rounded-2xl bg-gray-800'>
                    <img className={`${isActive ? 'w-15' : 'w-10'} rounded-2xl object-cover transition-all`} src={story.userID.imageFile} alt="" />
                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-2'>
                            <span className=''>{story.userID.username}</span>
                            <span>1 小時前</span>
                        </div>
                        <p className=''>{story.caption}</p>
                    </div>
                </div>
                <div className='relative h-[85%]'>
                    <img className='w-full h-full object-cover transition-all' src={story.image} alt="" />
                    <div className='absolute bottom-0 w-full p-3 flex flex-row justify-between '>
                        <Icon.Heart className='cursor-pointer' />
                        <Icon.Bookmark className='cursor-pointer' />
                    </div>
                </div>
            </div>
            <img onClick={handleNext} src={cookie} className={`${isActive ? 'w-15 h-15' : 'w-0 h-0'}  cursor-pointer transition-all duration-300`} alt="" />
        </div>
    )
}

export default StoryCard