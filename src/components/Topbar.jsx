import React, { useContext, useEffect, useState } from 'react'
import cookie from '../assets/cookie4.png'
import StoryPreview from './StoryPreview'
import { Context } from '../context/Context.jsx'

const Topbar = () => {
    const { navigate, setStoryIndex } = useContext(Context)

    const openStories = (index) => {
        setStoryIndex(index)
        console.log("stories opened")
        navigate('/storiespage')
    }

    const [followings, setFollowings] = useState([])
    const [stories, setStories] = useState([])
    const onLoad = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:5000/api/follow/follows", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            //console.log(data.follows)
            setFollowings(data.follows)

            const followingIds = data.follows.map(item => item.followingID._id)
            const response2 = await fetch(`http://localhost:5000/api/story/get?ids=${followingIds.join(",")}`, {
                method: "GET"
            })

            const data2 = await response2.json()
            console.log(data2.stories)
            setStories(data2.stories)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])
    return (
        <div className=' w-full pl-5 flex flex-row justify-between items-center gap-3 '>
            <img className='left-0 w-15 h-15 rounded-3xl cursor-pointer ' src={cookie} alt="" />
            <div className='w-full flex flex-row justify-start items-center gap-5 '>
                {stories.map((item, index) => {
                    return (
                        <StoryPreview key={index} story={item} onClick={() => openStories(index)} />
                    )
                })}
            </div>

            <img className='right-0 w-15 h-15 rounded-3xl cursor-pointer' src={cookie} alt="" />
        </div>
    )
}

export default Topbar