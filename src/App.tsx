import Header from './components/common/Header'
import Footer from './components/common/Footer'
import BackToTop from './components/common/BackToTop'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import { SECTION_IDS } from './utils/constants'
import { autoRunResponsiveTests } from './utils/responsiveTest'
import { useEffect } from 'react'
import Gallery from './components/sections/Gallery'
import { checkSupabaseConnection } from './utils/supabaseFetchers'

function App() {
  // Run responsive design tests in development
  useEffect(() => {
        checkSupabaseConnection(); // 👈 ตรวจสอบการเชื่อมต่อ Supabase
    if (import.meta.env.DEV) {
      autoRunResponsiveTests()
    }
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <Header />
      </header>

      <main>
        {/* Hero Section */}
        <section id={SECTION_IDS.HERO}>
          <Hero />
        </section>

        {/* About Section */}
        <section id={SECTION_IDS.ABOUT}>
          <About />
        </section>

        {/* Projects Section */}
        <section id={SECTION_IDS.PROJECTS}>
          <Projects />
        </section>
        
        {/* Gallery Section */}
        <section id={SECTION_IDS.PROJECTS}>
          <Gallery /> 
        </section>

        {/* Contact Section */}
        <section id={SECTION_IDS.CONTACT}>
          <Contact />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>

      <BackToTop />
    </div>
  )
}

export default App
