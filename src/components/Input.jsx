import React from 'react'

const Input = ({ text, value, onChange, type }) => {
    return (
        <input
            className='w-full p-2 bg-gray-900 rounded placeholder-gray-500'
            type={type}
            placeholder={text}
            value={value}
            onChange={onChange}
            required />
    )
}

export default Input