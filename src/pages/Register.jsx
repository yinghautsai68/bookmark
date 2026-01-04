import React, { useContext, useEffect, useRef, useState } from 'react'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Context } from '../Context/Context'

import toast from 'react-hot-toast'

import cookie from '../assets/cookie.png'
const Register = ({ text }) => {
    const notify = (msg) => toast.error(msg)
    const { navigate } = useContext(Context)


    const [step, setStep] = useState(1)
    //step1
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    //step2
    const fileInputRef = useRef(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")

    const nextStep = () => {
        if (email === "") {
            notify("email")
        } else if (password === "") {
            notify("請輸入密碼")
        } else if (confirmPassword === "") {
            notify("請確認密碼")
        } else {
            setStep(2)
        }


        console.log(step)
    }
    const handleDivClick = () => {
        fileInputRef.current.click();
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("email", email)
        formData.append("password", password);
        formData.append("imageFile", fileInputRef.current.files[0]);
        formData.append("username", username);
        formData.append("bio", bio);


        try {
            const res = await fetch("http://localhost:5000/api/user/register", {
                method: "POST",
                body: formData,

                /*JSON */
                /*
                headers: {
                    "Content-Type": "application/json"
                },
                */
                /*
                body: JSON.stringify({ email, password, username, imageFile, bio })
                */

            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message)
                navigate("/")

            }
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(username)
    }, [username])
    return (
        <div className='w-full h-full'>
            <div className='w-full h-[85%] flex flex-row justify-center items-center'>
                <div className='w-[20%] flex flex-col gap-5'>
                    <Title text='BookMark'></Title>
                    <form action="" onSubmit={onSubmit} className='flex flex-col gap-2'>
                        {
                            step === 1 && (<div className='flex flex-col gap-2'>
                                <Input text="電子郵件" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input type='password' text="密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Input type='password' text="重新密碼" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <Button type="button" text="下個步驟" onClick={nextStep} className='rounded-xl' />
                            </div>)
                        }
                        {step === 2 && (
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row gap-3'>
                                    <div className='flex-1 flex flex-col gap-2'>
                                        <div>
                                            {/* Clickable Div */}
                                            <div
                                                onClick={handleDivClick}
                                                style={{
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius: "50%",
                                                    border: "2px dashed gray",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt="preview"
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <span>Click to upload</span>
                                                )}
                                            </div>

                                            {/* Hidden Input */}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <Input text="用戶名稱" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='p-2 flex-1 border rounded-xl' name="" id="" placeholder='描述你自己'></textarea>

                                </div>
                                <Button text="註冊" type="submit" className="rounded" />
                            </div>
                        )}


                    </form>

                    <Link to="/">
                        <p className='text-center cursor-pointer'>有帳號? 登入</p>
                    </Link>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Register