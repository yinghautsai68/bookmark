import React, { useContext } from 'react'
import StoryCard from './StoryCard'
import cookie from '../assets/cookie4.png'

const Stories = () => {

    return (
        <div className={`${stories === false ? 'hidden' : ''} absolute top-5 left-140 z-50 flex flex-row items-center gap-10 h-[90vh]`}>
            <div className='flex flex-row items-center gap-5 h-full'>
                <img className='w-10 h-10 rounded-full' src={cookie} alt="" />

                <StoryCard />

                <img className='w-10 h-10 rounded-full' src={cookie} alt="" />
            </div>
            <StoryCard />
            <StoryCard />
        </div>
    )
}

export default Stories