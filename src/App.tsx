import { MotionConfig } from 'framer-motion'
import Navigation from './components/Navigation/Navigation'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Changelog from './components/Changelog/Changelog'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Changelog />
        <Skills />
        <Contact />
      </main>
    </MotionConfig>
  )
}
