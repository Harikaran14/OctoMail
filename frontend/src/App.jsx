import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TestCounter from './components/TestCounter'
import DashboardPage from './pages/DashboardPage'
import Sidebar from './components/SideBar'
import Layout from './components/Layout'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
     <Layout><AppRoutes></AppRoutes></Layout>
    </>
  )
}

export default App
