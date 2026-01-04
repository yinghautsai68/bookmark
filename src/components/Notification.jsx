import React from 'react'
import cookie from '../assets/cookie.png'
const Notification = () => {
    return (
        <div className='flex flex-row gap-5'>
            <img className='w-15 rounded-2xl' src={cookie} alt="" />
            <div className='flex flex-col'>
                <span>nani_seolgi</span>
                <span>給你文章按讚!</span>
            </div>
            <img className='w-15' src={cookie} alt="" />
        </div>
    )
}

export default Notification