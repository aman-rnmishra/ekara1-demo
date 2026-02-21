import Header from './components/Header'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import StartupSuite from './components/StartupSuite'
import PersonalFinanceSuite from './components/PersonalFinanceSuite'
import CorporateFinanceSuite from './components/CorporateFinanceSuite'
import Services from './components/Services'
import Impact from './components/Impact'
import WhyEkara from './components/WhyEkara'
import Founder from './components/Founder'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <StartupSuite />
        <PersonalFinanceSuite />
        <CorporateFinanceSuite />
        <Services />
        <Impact />
        <WhyEkara />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
