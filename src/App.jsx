import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Search from './pages/Search'
import Sidebar from './components/Sidebar'
import MessageButton from './components/MessageButton'
import MessageContainer from './components/MessageContainer'
import Profile from './pages/Profile'

import Register from './pages/Register'
import Chatroom from './pages/Chatroom'
import Create from './pages/Create'
import Register_2 from './pages/Register_2'
import { Toaster } from 'react-hot-toast'
import StoriesPage from './pages/StoriesPage'
const App = () => {

  const location = useLocation()
  const loginPage = location.pathname === '/'
  const registerPage = useLocation().pathname === '/register'
  const registerPage2 = useLocation().pathname === '/register2'
  const storiesPage = useLocation().pathname === '/storiespage'
  return (
    <div className='flex flex-row h-screen bg-black text-white'>
      <Toaster />
      {loginPage || registerPage || registerPage2 || storiesPage ? null :
        <div className='fixed w-[20%] h-full'>
          <Sidebar />
        </div>
      }

      <div className={`w-full  ${loginPage || registerPage || registerPage2 || storiesPage ? '' : 'ml-[20%]'}`}>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/register2' element={<Register_2 />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/chatroom' element={<Chatroom />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path='/create' element={<Create />}></Route>
          <Route path='/storiespage' element={<StoriesPage />}></Route>
        </Routes>
      </div>
      {loginPage ? null :
        <div className='hidden'>
          <MessageContainer />
          <MessageButton />
        </div>
      }

    </div>
  )
}

export default App