import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import * as Icon from 'react-feather'
import Grid from '../components/Grid'
import SearchBar from '../components/SearchBar'
import ListItemAccount from '../components/ListItemAccount'
import Filter from '../components/Filter'
import cookie from '../assets/cookie.png'




import io from "socket.io-client"
const socket = io("http://localhost:5000")
const Chatroom = () => {
    const [users, setUsers] = useState([])
    const onLoad = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await fetch("http://localhost:5000/api/user/users", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            const data = await response.json()

            console.log(data)
            setUsers(data.users)
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        onLoad()
    }, [])

    //Chat Load
    const [messages, setMessages] = useState([])
    const loadChat = async (chatid) => {
        try {
            const response = await fetch(`http://localhost:5000/api/chat/load/${chatid}`)
            const data = await response.json()
            console.log("messages: ", data.messages)
            setMessages(data.messages)

        } catch (error) {
            console.log(error.message)
        }
    }

    //Choose Chat
    const [myID, setMyID] = useState("")
    const [selectedUser, setSelectedUser] = useState("")
    const [chatID, setChatID] = useState("")
    const handleClick = async (user) => {
        setSelectedUser(user)
        setMessages([])

        let myID;
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:5000/api/user/me", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            myID = data.id
            setMyID(myID)


            const response2 = await fetch("http://localhost:5000/api/chat/access", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users: [data.id, user._id]
                })
            })
            const data2 = await response2.json()



            setChatID(data2.chatID)
            setChatUsers([myID, user._id])


            socket.emit("joinChat", data2.chatID)
            loadChat(data2.chatID)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser])

    //Chat
    const [chatUsers, setChatUsers] = useState([])
    const [message, setMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            {/* const response = await fetch("http://localhost:5000/api/chat/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users: chatUsers,
                    message: message
                })
            })
            const data = await response.json()


                     */}

            socket.emit("sendMessage", {
                chatID,
                senderID: myID,
                message
            })

            //console.log(message)
            //console.log("message sent!", data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        // Listen for messages coming from the server
        socket.on("receiveMessage", (newMessage) => {
            setMessages(prev => [...prev, newMessage])
        })

        // Cleanup when component unmounts or chat changes
        return () => {
            socket.off("receiveMessage")
        }
    }, [])



    return (
        <div className='w-full h-full flex flex-row justify-center items-center'>
            <div className='w-[50%] h-full flex flex-col justify-center items-center gap-5 '>
                <Title text="聊天室" />
                <SearchBar className='w-[75%] h-10' />

                <div className='w-full px-5 flex flex-col gap-5'>
                    {/*<Filter />*/}
                    <div className='w-full h-80   flex flex-col gap-3  overflow-auto hide-scrollbar'>
                        {users.map((item, index) => {
                            return (
                                <ListItemAccount key={index} user={item} handleClick={() => handleClick(item)} variant="chat" />
                            )
                        })}

                    </div>
                </div>


            </div>
            {chatID ? (
                <div className='w-full h-full flex flex-col justify-between'>
                    <div className='w-full h-[15%] px-15  flex flex-row justify-between bg-gray-500 rounded-2xl'>
                        <div className='flex flex-row items-center gap-3'>
                            <img className='w-15 h-15 object-cover' src={selectedUser.imageFile} alt="" />
                            <span>{selectedUser.username}</span>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <img className='w-15' src={cookie} alt="" />
                            <img className='w-15' src={cookie} alt="" />
                        </div>
                    </div>

                    <div className='w-full  h-[70%] px-15 py-5 flex flex-col gap-3 overflow-auto'>
                        {
                            messages.map((item, index) => {
                                return (
                                    <div key={index} className={`flex flex-row ${myID === item.senderID ? "justify-end" : "justify-startS"} `}>
                                        <div className='inline-flex px-5  justify-center bg-blue-500 rounded-full'>
                                            <span>{item.message}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                    <form onSubmit={handleSubmit} className='w-full h-[15%] p-5 flex flex-row bg-gray-500'>
                        <input onChange={(e) => setMessage(e.target.value)} className='w-[85%] pl-5 h-full bg-gray-900 rounded-2xl'></input>
                        <div className='w-[15%] flex flex-row justify-center  '>
                            <button className='w-[100] border cursor-pointer' >send</button>
                            <img className='w-[100%]   rounded-full' src={cookie} alt="" />
                        </div>
                    </form>

                </div>
            ) : (<div className='w-full h-full flex flex-col justify-center items-center border'>
                <span>  選擇一個聊天開始對話</span>
            </div>)}




        </div >
    )
}

export default Chatroom