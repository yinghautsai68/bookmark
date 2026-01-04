import React, { useEffect, useState } from 'react'
import cookie from '../assets/cookie4.png'
import cookiebg from '../assets/cookie.png'
import Button from '../components/Button'
import PostDetail from '../components/PostDetail'

import { useParams } from "react-router-dom"
const Profile = () => {
    const { id } = useParams()

    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [postsCount, setPostsCount] = useState(0)
    const [followersCount, setFollowersCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const [createdAt, setCreatedAt] = useState("")

    const [posts, setPosts] = useState([])
    const formDate = (isoString) => {
        const date = new Date(isoString)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return `${year}年${month}月${day}日`
    }

    const [selectedPost, setSelectedPost] = useState(null)
    const onLoad = async () => {
        const token = localStorage.getItem('token')



        let response
        if (id) {
            response = await fetch(`http://localhost:5000/api/user/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        } else {
            response = await fetch(`http://localhost:5000/api/user/me`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

        }

        const data = await response.json()
        console.log(data)
        setUsername(data.username)
        setBio(data.bio)
        setProfilePic(data.profilePic)
        setCreatedAt(data.createdAt)

        let response2
        if (id) {
            response2 = await fetch(`http://localhost:5000/api/post/${id}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

        } else {
            response2 = await fetch("http://localhost:5000/api/post/me", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
        }

        const data2 = await response2.json()

        console.log(data2)
        setPosts(data2.posts)
    }



    useEffect(() => {
        onLoad()
    }, [id])
    return (
        <div className='w-full h-full flex flex-row gap-5'>
            {/*<PostDetail />*/}
            <div className='w-[35%] flex flex-col gap-3'>
                <div className='h-[25%] p-5 flex flex-row items-center gap-5 bg-cover bg-center bg-black/50 bg-blend-darken' style={{ backgroundImage: `url(${cookiebg})` }}>

                    <img className='w-25 h-25 rounded-2xl object-cover cursor-pointer ' src={profilePic} alt="" />
                    <div className='flex flex-col justify-between pt-10 pb-7'>
                        <h1 className='text-md'>{username}</h1>
                        <div className='flex flex-row gap-2'>
                            <div className='text-sm'>
                                <p>文章</p>
                                <span>{postsCount}</span>
                            </div>
                            <div className='text-sm'>
                                <p>粉絲</p>
                                <span>{followersCount}</span>
                            </div>
                            <div className='text-sm'>
                                <p>追蹤</p>
                                <span>{followingCount}</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='h-[70%] p-5 flex flex-col items-center gap-5 bg-gray-900 rounded-bl-3xl rounded-br-3xl'>
                    <div className='w-full flex flex-col'>
                        <span>成為成員時間</span>
                        <span>{formDate(createdAt)}</span>
                    </div>
                    <div className='w-full flex flex-col'>
                        <span>個人簡介</span>
                        <span>{bio}</span>
                    </div>
                    <div className='w-full'>
                        <span>最愛</span>
                        <div className='w-full h-30 flex flex-row justify-center gap-3'>
                            <img className='flex-1 rounded-2xl' src={cookie} alt="" />
                            <img className='flex-1 rounded-2xl' src={cookie} alt="" />
                            <img className='flex-1 rounded-2xl' src={cookie} alt="" />
                        </div>
                    </div>
                    <div className='w-full flex flex-row justify-center gap-2'>
                        <Button className="flex-1 " text="編輯個人資料"></Button>
                        <Button className="flex-1" text="限時"></Button>
                    </div>
                </div>
            </div>




            <div className="w-[65%] h-full   overflow-auto hide-scrollbar">
                <div className=' grid grid-cols-3'>
                    {posts.map((item) => (
                        <div
                            key={item._id}
                            className="w-full aspect-square overflow-hidden"
                        >
                            <img
                                src={item.image_URL}
                                alt=""
                                className="w-full h-full object-cover hover:opacity-50 transition cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>


        </div >
    )
}

export default Profile