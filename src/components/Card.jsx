import React, { useEffect, useState } from 'react'
import cookie from '../assets/cookie4.png'
import cookie2 from '../assets/cookie.png'
import * as Icon from 'react-feather'
const Card = ({ post, onClick }) => {
    //OnLoad
    const [profilePic, setProfilePic] = useState("")
    const [username, setUsername] = useState("")
    const getUserInfo = async () => {
        const response = await fetch(`http://localhost:5000/api/user/${post.userID}/userinfo`)
        const data = await response.json()
        //console.log(data)
        setProfilePic(data.profilePic)
        setUsername(data.username)
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    const timeAgo = (dateString) => {
        const now = new Date()
        const past = new Date(dateString)

        const diffMs = now - past
        const diffMinutes = Math.floor(diffMs / 1000 / 60)
        const diffHours = Math.floor(diffMinutes / 60)
        const diffDays = Math.floor(diffHours / 24)

        if (diffMinutes < 60) {
            return `${diffMinutes} 分鐘前`
        }

        if (diffHours < 24) {
            return `${diffHours} 小時前`
        }

        return `${diffDays} 天前`
    }

    //GET likes count
    const [likesCount, setLikesCount] = useState("")
    const getLikesCount = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/post/${post._id}/getlikecount`, {
                method: "GET"
            })
            const data = await response.json()

            //console.log(data)
            setLikesCount(data.likesCount)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getLikesCount()
    }, {})

    //PUT Likes
    const [liked, setLiked] = useState("")
    const handleLike = async () => {
        try {
            let token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data)
            setLiked(data.liked)
            setLikesCount(data.likesCount)

        } catch (error) {
            console.log(error.message)
        }
    }

    //GET comments count
    const [commentsCount, setCommentsCount] = useState("")
    const getCommentsCount = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/comment/${post._id}/getcommentscount`)
            const data = await response.json()

            //console.log(data)
            setCommentsCount(data.commentsCount)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getCommentsCount()
    }, [])

    const [bookmarked, setBookmarked] = useState(null)
    const bookmarkStatus = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:5000/api/postbookmark/${post._id}/bookmarked`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            //console.log("bookmarked:" + !!data.bookmarked)
            setBookmarked(!!data.bookmarked)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        bookmarkStatus()
    }, [])
    const handleBookmark = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:5000/api/postbookmark/${post._id}/bookmark`, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            setBookmarked(data.bookmarked)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='w-100 h-200 flex flex-col gap-3    '>
            <div className='flex flex-row items-center gap-5'>
                <img className='w-15 h-15 rounded-xl object-cover' src={profilePic} alt="" />
                <p className='text-white text-sm'>{username}</p>
                <p className='text-white text-sm'>發文 {timeAgo(post.createdAt)}</p>

            </div>
            <div className='w-full h-150 px-5 flex flex-row justify-center border'>
                <img onClick={onClick} className=' object-cover' src={post.image_URL} alt="" /></div>

            <div className='flex flex-row justify-between px-2 py-2'>
                <div className='flex flex-row gap-2'>
                    <Icon.Heart onClick={handleLike} className='cursor-pointer' />
                    <span>{likesCount}</span>
                    <Icon.MessageCircle />
                    <span>{commentsCount}</span>
                </div>
                <Icon.Bookmark onClick={handleBookmark} className={`${bookmarked ? 'text-red-500' : 'text-gray-500'}  cursor-pointer`} />
            </div>

            <p className='text-justify'>{post.caption}</p>

        </div>
    )
}

export default Card