import React from 'react'
import Title from './Title'

const Footer = () => {
    return (
        <div className='w-full h-[15%] px-90 py-10 flex flex-row justify-between items-center '>
            <div className='flex flex-col items-start '>
                <Title title="BookMark" />
                <p>Copyright @ 2025 BookMark</p>
            </div>
            <ul className='h-full flex flex-row gap-5 items-center  '>
                <li>關於</li>
                <li>服務</li>
                <li>聯絡</li>
                <li>隱私</li>
                <li>使用條款</li>
            </ul>
        </div>
    )
}

export default Footer