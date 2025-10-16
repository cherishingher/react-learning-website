import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
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

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <ThemeToggle />
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/campus/:campusId" element={<Campus />} />
                <Route path="/staff/:staffId" element={<Staff />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/login" element={<Login />} />
                <Route path="/vip" element={<VIP />} />
                <Route path="/gesp" element={<GESP />} />
                <Route path="/gesp/:language" element={<GESPLanguage />} />
                <Route path="/gesp/:language/:levelId" element={<GESPLevelDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
