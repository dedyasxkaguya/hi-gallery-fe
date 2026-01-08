import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Post from './assets/pages/Post'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/post/:slug' element={<Post/>}></Route>
    </Routes>
  )
}

export default App