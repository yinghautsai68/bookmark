import React from 'react'
import Notification from './Notification'

const Notifications = () => {
    return (
        <div className='flex flex-col gap-2'>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
        </div>
    )
}

export default Notifications