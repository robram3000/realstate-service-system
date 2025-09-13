import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLandingPage from './Baselandingpage.jsx'
import { Login, ForgotPasswordFlow } from '../src/Page/index'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<BaseLandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="forgotpassword" element={<ForgotPasswordFlow />} />
            </Routes>
        </Router>
    </StrictMode>
)