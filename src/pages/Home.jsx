import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Title from '../components/Title'
import News from '../components/News'
import MessageButton from '../components/MessageButton'
import StoryCard from '../components/StoryCard'
import Stories from '../components/Stories'

import MessageContainer from '../components/MessageContainer'
import Button from '../components/Button'
import Notifications from '../components/Notifications'
import PostDetail from '../components/PostDetail'

const Home = () => {
    const [post, setPost] = useState([])

    const [selectedPost, setSelectedPost] = useState(null)

    const onLoad = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/feed`)

            const data = await response.json()
            //console.log(data)
            setPost(data.posts)



        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        onLoad()
    }, [])



    return (
        <div className='w-full h-full pt-5 flex flex-row gap-10 bg-black text-gray-400 '>
            {selectedPost &&
                <PostDetail post={selectedPost} setSelectedPost={setSelectedPost} />
            }

            <div className='w-[70%] flex flex-col justify-start items-center gap-5 overflow-auto hide-scrollbar  '>
                <Topbar />
                <div className=' flex flex-col justify-center items-center gap-15'>
                    {post.map((item) => {
                        return (

                            <Card onClick={() => setSelectedPost(item)} key={item._id} post={item} />

                        )
                    })}
                </div>

            </div>
            <div className='w-[30%] pt-15 flex flex-col  items-center gap-3'>
                <Title text={'BookMark'} />
                <div className='w-50 h-8 flex flex-row gap-2'>
                    <Button text="通知" />
                    <Button text="新聞" />
                </div>
                {/*   <News />*/}
                <Notifications />
            </div >
            {/*   <MessageContainer />*/}

            <MessageButton />
        </div >
    )
}

export default Home