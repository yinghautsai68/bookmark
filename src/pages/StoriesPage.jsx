import React, { useState, useEffect, useContext } from 'react'
import StoryCard from '../components/StoryCard.jsx'
import { Context } from '../context/Context.jsx'


const StoriesPage = ({ }) => {
    const { storyIndex } = useContext(Context)
    const [posts, setPosts] = useState([])
    const onLoad = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/story/get")

            const data = await response.json()
            console.log(data)
            setPosts(data.stories)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])

    const [index, setIndex] = useState(storyIndex)
    const width = 300

    const handlePrev = () => {
        setIndex((prev) => Math.max(prev - 1, 0))
    }

    const handleNext = () => {
        setIndex((prev) => Math.min(prev + 1, posts.length - 1))
    }

    useEffect(() => {
        console.log(index)
    }, [index])
    return (
        <div className='w-full h-screen flex flex-col overflow-hidden'>
            <div style={{ transform: `translateX(calc(50% - ${(index * width) + (500 / 2)}px)) ` }} className='w-full h-screen flex flex-row items-center gap-2  transition duration-300 '>
                {
                    posts.map((item, i) => {
                        return (
                            <StoryCard key={i} i={i} index={index} story={item} width={width} handlePrev={handlePrev} handleNext={handleNext} className={`  ${index === i ? 'w-[500px] h-[600px] ' : ' w-[300px] h-[400px]  opacity-60'}   transition-all duration-400`} />
                        )
                    })
                }
            </div>
        </div >
    )
}

export default StoriesPage