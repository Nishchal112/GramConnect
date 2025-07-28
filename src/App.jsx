import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage, Initiative, IssuePage, Login, Register, SchemePage, EditProfile } from './pages/Pages'
import AuthProvider from './AuthContext/AuthProvider'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/initiative' element={<Initiative />} />
          <Route path='/schemes' element={<SchemePage />} />
          <Route path='/issues' element={<IssuePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
