import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Stacks from './pages/Stacks'
import Certifications from './pages/Certifications'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function Home() {
  return (
    <>
      <LandingPage />
      <div id="about">          <About />          </div>
      <div id="experience">     <Experience />     </div>
      <div id="projects">       <Projects />       </div>
      <div id="stacks">         <Stacks />         </div>
      <div id="certifications"> <Certifications /> </div>
      <div id="blog">           <Blog />           </div>
    </>
  )
}
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/"           element={<Home />}     />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App