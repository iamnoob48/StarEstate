

import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import BuyersPage from './pages/BuyersPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp.jsx'
import Feed from './pages/Feed'
import OwnersPage from './pages/OwnersPage'
import AuthSuccess from './pages/AuthSuccess'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/buyers' element={<BuyersPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/owners' element={<OwnersPage/>}/>
        <Route path='/success' element={<AuthSuccess/>}/>
      </Routes>

    
      
    </>
  )
}

export default App
