import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Tabs from '../pages/tabs/Tabs'
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="navigator?" element={<Tabs />}></Route>
    </Routes>
  )
}

export default MainRoutes
