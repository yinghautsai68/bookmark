import React, { useState, useEffect, useRef, useContext } from 'react'
import Title from '../components/Title'
import * as Icon from 'react-feather'
import Grid from '../components/Grid'
import SearchBar from '../components/SearchBar'
import ListItemAccount from '../components/ListItemAccount'
import PostDetail from '../components/PostDetail'
import { Context } from '../context/Context'

const Search = () => {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])

    const [followingIDs, setFollowingIDs] = useState([])

    const [search, setSearch] = useState("")
    const [selectedPost, setSelectedPost] = useState('')

    const onLoad = async () => {
        try {
            //get Token
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

            const response2 = await fetch("http://localhost:5000/api/post/search")
            const data2 = await response2.json()
            console.log("users:" + data2.posts)
            setPosts(data2.posts)

            const response3 = await fetch("http://localhost:5000/api/follow/follows", {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data3 = await response3.json()
            console.log(data3)
            setFollowingIDs(data3.follows.map(item => item.followingID._id))


        } catch (error) {
            console.log(error.message)
        }
    }

    //Search
    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/search/username/${search}`)
            const data = await response.json()
            setUsers(data.user)

        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        if (!search) {
            onLoad()
            return
        } else {
            handleSearch()
        }
    }, [search])
    useEffect(() => {
        console.log(followingIDs)
    }, [followingIDs])

    //Profile
    const { navigate } = useContext(Context)
    const [selectedUser, setSelectedUser] = useState("")
    const handleClick = (user) => {
        setSelectedUser(user)
    }
    useEffect(() => {
        console.log(selectedUser)
        if (selectedUser) {
            navigate(`/profile/${selectedUser._id}`)
            setSelectedUser("")
        }

    }, [selectedUser])

    //Follow
    const handleFollow = async (followingID) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:5000/api/follow/${followingID}`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className=' w-full h-full flex flex-row justify-center items-center'>
            {selectedPost && (

                <PostDetail post={selectedPost} setSelectedPost={setSelectedPost} />
            )}

            <div className='w-[50%] h-full flex flex-col justify-center items-center gap-5 '>
                <Title text="搜尋" />
                <SearchBar setSearch={setSearch} className='w-[75%] h-10' />


                <div className='w-full h-80 px-5 flex flex-col gap-3  overflow-auto hide-scrollbar'>
                    {users.map((item, index) => {
                        return (
                            <ListItemAccount key={item._id} user={item} variant='search' handleClick={() => handleClick(item)} handleFollow={handleFollow} followingIDs={followingIDs} />

                        )
                    })}



                </div>
            </div>

            <Grid setSelectedPost={setSelectedPost} posts={posts} />

        </div>
    )
}

export default Search