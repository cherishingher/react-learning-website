import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
// import SplashCursor from './components/SplashCursor' // Removed splash cursor
// import Prism from './components/Prism' // Removed Prism background
import Home from './pages/Home'
import Courses from './pages/Courses'
import About from './pages/About'
import Contact from './pages/Contact'
import Campus from './pages/Campus'
import Staff from './pages/Staff'
import Playground from './pages/Playground'
import Learning from './pages/Learning'
import Login from './pages/Login'
import VIP from './pages/VIP'
import GESP from './pages/GESP'
import GESPLanguage from './pages/GESPLanguage'
import GESPLevelDetail from './pages/GESPLevelDetail'
import './App.css'

const pageMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 }
}

const pageTransition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1]
}

const PageWrapper = ({ children }) => (
  <motion.div
    className="page-transition"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageMotion}
    transition={pageTransition}
  >
    {children}
  </motion.div>
)

const AppContent = () => {
  const location = useLocation()
  
  // Prism logic removed
  // const showPrismPages = ['/', '/courses', '/learning', '/about']
  // const shouldShowPrism = showPrismPages.includes(location.pathname)
  
  // SplashCursor logic removed
  // const showSplashPages = ['/', '/courses', '/learning', '/about', '/playground']
  // const shouldShowSplash = showSplashPages.includes(location.pathname) || location.pathname.startsWith('/gesp')

  return (
    <div className="App">
      {/* Prism background removed */}
      
      <ThemeToggle />
      {/* SplashCursor component removed */}
      
      <Header />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/courses" element={<PageWrapper><Courses /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/campus/:campusId" element={<PageWrapper><Campus /></PageWrapper>} />
            <Route path="/staff/:staffId" element={<PageWrapper><Staff /></PageWrapper>} />
            <Route path="/playground" element={<PageWrapper><Playground /></PageWrapper>} />
            <Route path="/learning" element={<PageWrapper><Learning /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/vip" element={<PageWrapper><VIP /></PageWrapper>} />
            <Route path="/gesp" element={<PageWrapper><GESP /></PageWrapper>} />
            <Route path="/gesp/:language" element={<PageWrapper><GESPLanguage /></PageWrapper>} />
            <Route path="/gesp/:language/:levelId" element={<PageWrapper><GESPLevelDetail /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
