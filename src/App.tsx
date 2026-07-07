import Nav from './components/Nav'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Stacks from './pages/Stacks'
import Certifications from './pages/Certifications'
import Blog from './pages/Blog'

function App() {
  return (
    <>
      <Nav />
      <LandingPage />

      <div id="about">        <About />         </div>
      <div id="experience">  <Experience />     </div>
      <div id="projects">    <Projects />       </div>
      <div id="stacks">      <Stacks />         </div>
      <div id="certifications"><Certifications /></div>
      <div id="blog">         <Blog />          </div>
    </>
  )
}

export default App