import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import AddRecipe from './components/pages/AddRecipe/AddRecipe'
import Homepage from './components/pages/Homepage/Homepage'
import AllRecipes from './components/pages/AllRecipes/AllRecipes'
import LoginPage from './components/pages/LoginPage/LoginPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/recipes' element={<AllRecipes/>}/>
        <Route path='/addrecipe' element={<AddRecipe/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
