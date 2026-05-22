import Nav        from '@/components/Nav'
import Hero       from '@/components/Hero'
import Frontier   from '@/components/Frontier'
import Possible   from '@/components/Possible'
import Platform   from '@/components/Platform'
import Timeline   from '@/components/Timeline'
import StartWhere from '@/components/StartWhere'
import Proof      from '@/components/Proof'
import FAQ        from '@/components/FAQ'
import Footer     from '@/components/Footer'
import Cursor     from '@/components/Cursor'

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Frontier />
        <Possible />
        <Platform />
        <Timeline />
        <StartWhere />
        <Proof />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
