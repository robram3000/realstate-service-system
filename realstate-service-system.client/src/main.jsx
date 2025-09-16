import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLandingPage from './Baselandingpage.jsx'
import { Login, ForgotPasswordFlow, Register } from '../src/Page/index'

const URL = {
    CLIENT: {
        FORGOT_PASSWORD: '/forgot-password',
        LOGIN: '/login',
        REGISTER: '/register'
    
    }
   
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<BaseLandingPage />} />
                <Route path={URL.CLIENT.LOGIN} element={<Login />} />
                <Route path={URL.CLIENT.REGISTER} element={<Register />} />
                <Route path={URL.CLIENT.FORGOT_PASSWORD} element={<ForgotPasswordFlow />} />
            </Routes>
        </Router>
    </StrictMode>
)