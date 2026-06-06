import { useState } from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'
import LoadingScreen from '../pages/LoadingScreen'
import Header from './Header'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Collections from '../sections/Collections'
import Contact from '../sections/Contact'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <ThemeProvider>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <Header />
          <main
            id="scroll-container"
            className="h-screen overflow-y-scroll scroll-smooth"
            style={{ scrollSnapType: 'y mandatory' }}
          >
            <Hero />
            <About />
            <Collections />
            <Contact />
          </main>
        </>
      )}
    </ThemeProvider>
  )
}

export default App
