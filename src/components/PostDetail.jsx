import React, { useState, useEffect } from 'react'
import cookie from '../assets/cookie.png'
import * as Icon from 'react-feather'
const PostDetail = ({ post, setSelectedPost }) => {
    useEffect(() => {
        console.log(post)
    }, [])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const onLoad = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/comment/${post._id}/get`)
            const data = await response.json()
            console.log(data)
            setComments(data.comments)

            const token = localStorage.getItem("token")
            const response2 = await fetch(`http://localhost:5000/api/post/${post._id}/likestatus`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data2 = await response2.json()

            console.log("data2", data2)
            setLiked(!!data2._id)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])
    //PUT likes count
    const [liked, setLiked] = useState(null)
    const handleLike = async (req, res) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
                method: 'PUT',
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data)
            setLiked(data.liked)
        } catch (error) {
            console.log(error.message)
        }
    }



    const commentPost = async (e) => {
        e.preventDefault()
        try {

            let token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("postID", post._id)
            formData.append("comment", comment)

            const response = await fetch('http://localhost:5000/api/comment/post', {
                method: "POST",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`
                }

            })

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div onClick={() => setSelectedPost(null)} className='fixed top-0 left-0 w-full h-screen flex flex-row justify-center items-center bg-black/70  z-20'>
            <div onClick={(e) => e.stopPropagation()} className='w-[50%] h-[80%] p-5 flex flex-row justify-center items-center bg-gray-800'>
                <img className='w-[50%] h-full object-cover' src={post.image_URL} alt="" />
                <div className='w-[50%] h-full flex p-2 flex-col gap-2  bg-black '>
                    <div className='h-full flex flex-col gap-2 overflow-y-auto'>
                        {comments.map((item) => {
                            return (
                                <div key={item._id} className='p-3 flex flex-row items-center gap-3 bg-gray-900'>
                                    <img className='w-15 h-15 rounded-xl object-cover' src={item.userID.imageFile} alt="" />
                                    <div className='flex flex-col'>
                                        <span>{item.userID.username}</span>
                                        <span>{item.text}</span>
                                    </div>
                                </div>
                            )
                        })}



                    </div>

                    <form onSubmit={commentPost} className='px-3 py-6 flex flex-row items-center bg-gray-900'>
                        <Icon.Heart onClick={handleLike} className={`${liked ? 'text-red-100' : 'text-gray-500'}  w-10 h-10 cursor-pointer`} />
                        <input type="text" placeholder='留言' value={comment} onChange={(e) => setComment(e.target.value)} className='w-full pl-2' />

                        <button type='submit' className='w-10 h-10'><Icon.Send className='w-5 h-5' /></button>
                        <Icon.Bookmark className='w-10 h-10' />


                    </form>
                </div>
            </div>

        </div >
    )
}

export default PostDetail