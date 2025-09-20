

import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import BuyersPage from './pages/BuyersPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp.jsx'
import Feed from './pages/Feed'
import OwnersPage from './pages/OwnersPage'
import AuthSuccess from './pages/AuthSuccess'
import PropertyPage from './pages/PropertyPage.jsx'
import PropertyDetailsPage from './componentsLib/BuyersComponets/PropertyDetailsPage'
import TenantsPage from './pages/TenantsPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/buyers' element={<BuyersPage/>}/>
        <Route path='/tenants' element={<TenantsPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/owners' element={<OwnersPage/>}/>
        <Route path='/success' element={<AuthSuccess/>}/>
        <Route path='/owners/property/:id' element= {<PropertyPage/>}/>
        <Route path='/buyers/property/:id' element={<PropertyDetailsPage/>}/>

      </Routes>

    
      
    </>
  )
}

export default App
