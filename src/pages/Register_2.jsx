import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Context } from '../Context/Context'


const Register_2 = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, username })
            });
            const data = await res.json();
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
                        <div>

                        </div>

                        <Button text="註冊" type="submit" />
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

export default Register_2