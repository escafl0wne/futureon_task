import { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./utils/ProtectedRoute.jsx"
function App() {
  

  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
      <Route path="/"  exact element={<Home/>}/> 
        </Route>
      
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App
