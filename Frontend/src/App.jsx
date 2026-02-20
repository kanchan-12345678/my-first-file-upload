import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Component/Home'
import Edit from './Component/Edit'
import Create from './Component/Create'
import Read from './Component/Read'
import Profile from './Component/Profile'


function App() {
 

  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
       <Route path='/create' element={<Create/>}></Route>
       <Route path='/profile/:id' element={<Profile/>}></Route>
       <Route path='/read/:id' element={<Read/>}></Route>
       <Route path='/edit/:id' element={<Edit/>}></Route>
      
       </Routes>
    </BrowserRouter>
     
  )
}

export default App