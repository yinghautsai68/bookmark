import React from 'react'

const SearchBar = ({ className, setSearch }) => {
    return (
        <div className={`flex flex-row ${className} gap-5 `}>
            < input onChange={(e) => setSearch(e.target.value)} className={`w-full p-2 bg-gray-900 rounded placeholder-gray-500 `
            } type="text" placeholder="搜尋" />
            <div className='w-[20%] rounded-full bg-green-100'>

            </div>
        </div >
    )
}

export default SearchBar