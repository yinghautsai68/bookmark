import React from 'react'
import cookie from '../assets/cookie4.png'
const StoryPreview = ({ onClick, className, story }) => {
    return (

        <div onClick={onClick} className=' w-[15%] flex flex-col justify-center items-center cursor-pointer'>
            <img className='w-25 h-25 rounded-3xl object-cover' src={story.image} alt="" />
            <p className=' text-center'>{story.userID.username}</p>
        </div>

    )
}

export default StoryPreview