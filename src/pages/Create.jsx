import React, { useState, useRef, useEffectEvent, useEffect, useContext } from 'react'
import cookie from '../assets/cookie4.png'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

const Create = () => {
    const { navigate } = useContext(Context)
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [mode, setMode] = useState("post")

    //OnLoad
    const [profilePic, setProfilePic] = useState("")
    const [username, setUsername] = useState("")
    const onLoad = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:5000/api/user/me", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()

            console.log(data)
            setProfilePic(data.profilePic)
            setUsername(data.username)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])


    const ref = useRef(null)
    const handleClick = () => {
        ref.current.click()
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImagePreview(URL.createObjectURL(file))
        setImage(ref.current.files[0])
    }



    const notify = (msg) => toast.success(msg)
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(image, caption)

        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("image", image)
            formData.append("caption", caption)
            if (mode === "post") {
                const response = await fetch('http://localhost:5000/api/post/create', {
                    method: "POST",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                console.log(data)
                if (response.status === 200) {
                    notify("Post uploaded successfully")

                    navigate('/home')
                }
            } else if (mode === "story") {
                const response = await fetch('http://localhost:5000/api/story/create', {
                    method: "POST",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                console.log(data)
                if (response.status === 200) {
                    notify("Story uploaded successfully")

                    navigate('/home')
                }
            }

        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <div className='w-full h-full p-10 flex flex-row gap-5'>
            <div className='w-[50%] h-full flex flex-col gap-2'>

                <div className='w-full h-full flex flex-col overflow-hidden'>

                    <div onClick={handleClick} className='w-full h-full flex flex-row bg-gray-800 cursor-pointer'>
                        {
                            imagePreview && (
                                <img src={imagePreview} className='w-full h-full object-cover' alt="" />
                            )
                        }
                    </div>
                    <input type="file" ref={ref} onChange={(e) => handleImage(e)} className='hidden' />
                </div>

                {
                    /*   <div className='w-full h-[15%] flex flex-row gap-2'>
                    <img className='flex-1' src={cookie} alt="" />
                    <img className='flex-1' src={cookie} alt="" />
                    <img className='flex-1' src={cookie} alt="" />
                    <img className='flex-1' src={cookie} alt="" />
                </div>*/
                }


            </div>

            <form onSubmit={onSubmit} className='w-[35%] h-full p-5 flex flex-col justify-between gap-5 border rounded-2xl'>
                <div className='w-full h-[15%] flex flex-row justify-end'>
                    <img className='w-15 h-15' src={cookie} alt="" />
                </div>

                <div className='w-full h-[60%] flex flex-col gap-3 '>
                    <div className='w-full h-[15%] flex flex-row justify-start items-center gap-5'>
                        <img className='w-15 h-15 rounded-2xl object-cover  cursor-pointer  ' src={profilePic} alt="" />
                        <h1 className='text-md'>{username}</h1>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Button onClick={() => setMode("post")} type='button' text="貼文"></Button>
                        <Button onClick={() => setMode("story")} type='button' text="限時"></Button>
                    </div>
                    <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full flex-1  border rounded-2xl p-2 resize-none text-gray-500" placeholder="今天天氣真好..."></textarea>

                </div>
                <Button className="w-full h-[5%] rounded-lg" text="分享" />
            </form>


        </div >
    )
}

export default Create