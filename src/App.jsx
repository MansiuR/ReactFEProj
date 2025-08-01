import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import Viewpaste from './components/Viewpaste'
import  { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/pastes' element={<Paste/>} />
        <Route path='/paste/:id' element={<Viewpaste/>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App