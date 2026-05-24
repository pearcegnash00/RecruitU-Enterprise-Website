'use client'
import { useEffect, useRef } from 'react'

/* ─── 400 fictional financial services names ─── */
const NAMES: readonly string[] = [
  // Anglo-Saxon (120)
  'James Harrington','William Fletcher','Catherine Moore','Thomas Davies',
  'Robert Wilson','Elizabeth Thompson','Charles Taylor','Margaret Anderson',
  'Henry Brown','Victoria Jones','Richard Clark','Eleanor Smith',
  'Frederick Hall','Dorothy Walker','Edward Turner','Frances Allen',
  'Arthur Phillips','Constance Green','Walter Harris','Beatrice Martin',
  'George Lewis','Helen Baker','Harold Adams','Grace Campbell',
  'Leonard Rogers','Alice Reed','Douglas Cook','Edith Morgan',
  'Raymond Bell','Charlotte Murphy','Lawrence Bailey','Barbara Richardson',
  'Alan Cox','Patricia Howard','Philip Ward','Susan Peterson',
  'Roger Collins','Carol Stewart','Albert Young','Linda King',
  'Francis Walker','Diane Wright','Victor Edwards','Jean White',
  'Howard Scott','Judith Green','Eugene Davies','Sandra Campbell',
  'Theodore Morris','Marilyn Barnes','Clarence Hughes','Nancy Ellis',
  'Herbert Fox','Sharon Mitchell','Stanley Perry','Christine Patterson',
  'Ralph Webb','Deborah Powell','Harry Crawford','Cheryl Reid',
  'Gerald McDonald','Cynthia Ross','Frank Morrison','Karen Chapman',
  'Kenneth Price','Laura Gibson','Ronald Porter','Jennifer Hamilton',
  'Donald Simpson','Rebecca Warren','Russell Bryant','Claire Foster',
  'Patrick Mason','Louise Burke','Michael Robertson','Andrew Dixon',
  'David Harrison','Benjamin Clarke','Oliver Wright','Samuel Evans',
  'Daniel Turner','Christopher Davies','Simon Robinson','Nicholas Parker',
  'Jonathan Hill','Timothy Watson','Matthew Hayes','Anthony Hunter',
  'Stephen Gibson','Brandon Fox','Justin Hughes','Lawrence Ellis',
  'Marcus Griffin','Nathan Blake','Joshua Carter','Ryan Mitchell',
  'Ethan Lawson','Dylan Perry','Connor Hughes','Liam Patterson',
  'Austin Webb','Caleb Powell','Derek Walsh','Neil Crawford',
  'Gareth Reid','Stuart McDonald','Sarah Wellington','Victoria Pemberton',
  'Charlotte Huntington','Emily Cavendish','Diana Westbrook','Patricia Northwood',
  'Jennifer Cranfield','Samantha Wellington','Christine Fordham','Margaret Fairfax',
  'Elizabeth Ashfield','James Blackwood','William Ashford','George Worthington',
  // East Asian (40)
  'Michelle Chen','David Liang','Sarah Kim','James Tan',
  'Kevin Wong','Jennifer Liu','Brian Lee','Amy Park',
  'Andrew Zhang','Christina Cho','Jason Wang','Emily Yang',
  'Michael Zhou','Linda Wu','Christopher Huang','Angela Xu',
  'Steven Zhao','Grace Lin','Eric Guo','Alice Ma',
  'Patrick Sun','Karen Zheng','Richard Ha','Helen Yoon',
  'Mark Kwon','Jessica Choi','Alan Kang','Cynthia Jeon',
  'William Oh','Stephanie Chang','Kevin Ng','Sandra Yu',
  'Thomas Yin','Lisa Bae','Robert Seo','Nancy Han',
  'Philip Moon','Melissa Chung','George Lim','Sharon Fong',
  // South Asian (40)
  'Priya Patel','Arjun Sharma','Neha Mehta','Rohan Gupta',
  'Rahul Singh','Anjali Kumar','Deepak Kapoor','Divya Malhotra',
  'Vikram Agarwal','Kavita Desai','Sanjay Joshi','Shreya Shah',
  'Nikhil Nair','Pooja Reddy','Amit Pillai','Ananya Rao',
  'Vivek Iyer','Ishita Bhat','Kiran Srivastava','Riya Verma',
  'Aditya Trivedi','Simran Pandey','Dev Mishra','Tanvi Saxena',
  'Sidharth Chopra','Kabir Krishnan','Isha Venkataraman','Rishi Balakrishnan',
  'Pranav Subramaniam','Aditi Nambiar','Arun Nair','Suresh Iyer',
  'Ankit Patel','Niti Sharma','Trisha Kapoor','Meera Malhotra',
  'Varun Agarwal','Siddharth Gupta','Pooja Mehta','Kabir Sharma',
  // African (40)
  'Amara Okafor','David Mensah','Fatima Diallo','Samuel Achebe',
  'Emmanuel Eze','Kwame Nwosu','Adaeze Okonkwo','Ibrahim Asante',
  'Felix Boateng','Ngozi Adjei','Kofi Darko','Chioma Otieno',
  'Obinna Kamau','Kemi Mutua','Charles Abiodun','Victor Adeyemi',
  'Edwin Babangida','Yetunde Oyelaran','Patrick Taiwo','Bisi Fagbemi',
  'Tunde Obi','Seun Adewale','Nnamdi Ike','Lekan Chukwuemeka',
  'Aminata Toure','Abena Asare','Kwabena Mensah','Aisha Ibrahim',
  'Seydou Coulibaly','Mariama Bah','Chidi Eze','Ike Nwosu',
  'Adewale Okonkwo','Olumide Adeyemi','Funmilayo Afolabi','Ayodeji Bankole',
  'Chiamaka Nnaji','Obiageli Chukwuma','Uche Anyanwu','Emeka Obi',
  // Hispanic (40)
  'Carlos Reyes','Isabella Vega','Marco Santos','Diego Lopez',
  'Sofia Rodriguez','Alejandro Martinez','Valentina Garcia','Rafael Hernandez',
  'Camila Gonzalez','Eduardo Perez','Fernanda Flores','Felipe Rivera',
  'Adriana Torres','Sergio Ramirez','Gabriela Morales','Luis Gutierrez',
  'Catalina Jimenez','Pablo Ruiz','Veronica Alvarez','Ricardo Mendoza',
  'Jorge Silva','Daniela Castro','Fernando Vargas','Elena Rojas',
  'Miguel Herrera','Patricia Cruz','Andres Medina','Monica Salinas',
  'Roberto Delgado','Hector Fuentes','Rodrigo Vargas','Ana Castillo',
  'Manuel Romero','Alejandra Ramos','Oscar Contreras','Laura Herrera',
  'Alberto Medina','Luciana Torres','Emilio Fuentes','Valeria Cruz',
  // European (75)
  'Sophie Laurent','Pierre Dubois','Hans Weber','Elena Rossi',
  'Klaus Fischer','Isabelle Bernard','Thomas Mueller','Marco Bianchi',
  'Antoine Martin','Francesca Esposito','Werner Schmidt','Chloe Rousseau',
  'Friedrich Hoffmann','Claudia Romano','Nicolas Petit','Giuseppe Ferrari',
  'Ingrid Braun','Clement Moreau','Antonio Colombo','Hilde Schaefer',
  'Luca Ricci','Viktor Novak','Ekaterina Sokolova','Dmitry Volkov',
  'Marta Kowalski','Janusz Nowak','Agnieszka Wojcik','Alistair MacKenzie',
  'Fiona Campbell','Hamish Stewart','Niamh O\'Brien','Declan Murphy',
  'Brigid Walsh','Lars Andersen','Astrid Nilsson','Erik Johansson',
  'Ingrid Bergstrom','Magnus Larsson','Helga Hansen','Rolf Nielsen',
  'Karl Becker','Heinz Schwarz','Franz Kruger','Dietrich Braun',
  'Johan Vermeer','Pieter de Groot','Anneke Bakker','Hendrik Van der Berg',
  'Martina Schubert','Bjorn Lindqvist','Sven Karlsson','Anna Lindberg',
  'Olaf Gustafsson','Freya Magnusson','Dmitri Petrov','Natasha Ivanova',
  'Pavel Sorokin','Olga Popova','Vladimir Kuznetsov','Yuri Morozov',
  'Anastasia Lebedeva','Sergei Fedorov','Tatiana Orlova','Maxim Kozlov',
  'Lea Moreau','Jules Leblanc','Camille Fontaine','Baptiste Renard',
  'Margot Chevalier','Gianluca Ferretti','Valentina Bruno','Roberto Mancini',
  'Alessia Conti','Stefano Palumbo','Gunnar Eriksson',
  // Additional mix (45)
  'Charles Middleton','Catherine Blackwell','John Fernwood','Mary Silverstone',
  'Robert Goldsmith','Benjamin Ironwood','Laura Clearwater','Daniel Bridgeford',
  'Helen Stonefield','James Greenwood','Sarah Pemberton','Mark Whitmore',
  'Susan Hartley','Peter Dunmore','Rachel Fairfield','Paul Whitstone',
  'Sarah Lockwood','Philip Ridgeway','Janet Briarwood','Colin Hartfield',
  'Amanda Westmore','Geoffrey Blackmore','Carolyn Farnsworth','Clive Wentworth',
  'Spencer Wellington','Lindsay Whitmore','Trevor Ashton','Morgan Sinclair',
  'Whitney Bradford','Cameron Holt','Peyton Graves','Jordan Whitfield',
  'Madison Thornton','Christopher Blackwell','Amanda Reynolds','Nathan Cromwell',
  'Allison Fairmont','Gregory Pemberton','Diana Blackwood','Maxwell Crawford',
  'Harriet Worthington','Edmund Ashworth','Cecelia Stoneleigh','Howard Bridgeman',
  'Miriam Cavendish',
]

type NameObj = {
  text: string
  rx: number; ry: number
  x: number; y: number
  rotation: number
  baseOpacity: number
  fontSize: number
  pulseSpeed: number
  pulseOffset: number
  revealT: number
  hoverT: number
}

/* Loose grid placement — even distribution, no dead zones, protected zone excluded */
function placeNames(W: number, H: number, count: number): [number, number][] {
  const PROT = { x0: 0.25, x1: 0.75, y0: 0.28, y1: 0.72 }
  const aspect = W / H
  const cols   = Math.max(16, Math.ceil(Math.sqrt(count * aspect * 2.5)))
  const rows   = Math.max(10, Math.ceil(cols / aspect))

  const candidates: [number, number][] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const rx = Math.max(0.004, Math.min(0.996,
        (c + 0.5) / cols + (Math.random() - 0.5) * 0.8 / cols))
      const ry = Math.max(0.004, Math.min(0.996,
        (r + 0.5) / rows + (Math.random() - 0.5) * 0.8 / rows))
      if (rx >= PROT.x0 && rx <= PROT.x1 && ry >= PROT.y0 && ry <= PROT.y1) continue
      candidates.push([rx, ry])
    }
  }

  // Shuffle
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }

  // Fallback for edge cases
  while (candidates.length < count) {
    let rx: number, ry: number
    do { rx = Math.random(); ry = Math.random() }
    while (rx >= PROT.x0 && rx <= PROT.x1 && ry >= PROT.y0 && ry <= PROT.y1)
    candidates.push([rx, ry])
  }

  return candidates.slice(0, count)
}

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas  = canvasRef.current!
    const section = sectionRef.current!
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    let W = 0, H = 0
    let isMobile = false
    let names: NameObj[] = []
    const mouse = { x: -9999, y: -9999 }

    function buildNames() {
      isMobile    = W < 768
      const count = isMobile ? 150 : 400
      const pool  = NAMES.slice(0, count)
      const pos   = placeNames(W, H, count)

      names = pool.map((text, i) => {
        const rnd = Math.random()
        const fontSize = rnd < 0.35 ? 10 : rnd < 0.70 ? 11 : rnd < 0.80 ? 12 : rnd < 0.90 ? 13 : 14
        const [rx, ry] = pos[i]
        return {
          text, rx, ry, x: rx * W, y: ry * H,
          rotation:    (Math.random() - 0.5) * 24 * (Math.PI / 180),
          baseOpacity: 0.04 + Math.random() * 0.08,
          fontSize,
          pulseSpeed:  3000 + Math.random() * 5000,
          pulseOffset: Math.random(),
          revealT: 0, hoverT: 0,
        }
      })
    }

    function resize() {
      W = window.innerWidth
      H = section.offsetHeight || window.innerHeight
      canvas.width  = W
      canvas.height = H
      if (names.length === 0) {
        buildNames()
      } else {
        isMobile = W < 768
        names.forEach(n => { n.x = n.rx * W; n.y = n.ry * H })
      }
    }

    let raf: number

    function tick(time: number) {
      ctx.clearRect(0, 0, W, H)

      const mx = mouse.x
      const my = mouse.y

      names.forEach(n => {
        // Ambient pulse — independent sine per name
        const pulsePct = (time / n.pulseSpeed + n.pulseOffset) % 1
        const pulse    = Math.sin(pulsePct * Math.PI * 2) * 0.5 + 0.5
        const pulseOp  = n.baseOpacity + pulse * 0.06

        // Cursor interaction
        if (!isMobile) {
          const dist     = Math.hypot(n.x - mx, n.y - my)
          const inReveal = dist < 110
          const inHover  = dist < 40
          n.revealT += ((inReveal ? 1 : 0) - n.revealT) * (inReveal ? 0.28 : 0.07)
          n.hoverT  += ((inHover  ? 1 : 0) - n.hoverT)  * 0.2
        }

        // Final opacity blends pulse with cursor reveal
        const opacity = pulseOp + n.revealT * (0.85 - pulseOp)
        if (opacity < 0.005) return

        // Color: warm white → brand green as hoverT increases
        const cR = Math.round(232 + (45  - 232) * n.hoverT)
        const cG = Math.round(221 + (158 - 221) * n.hoverT)
        const cB = Math.round(208 + (95  - 208) * n.hoverT)

        const fw    = n.revealT > 0.5 ? 600 : 400
        const scale = 1 + n.hoverT * 0.08

        ctx.save()
        ctx.translate(n.x, n.y)
        ctx.rotate(n.rotation)
        if (n.hoverT > 0.01) ctx.scale(scale, scale)
        ctx.globalAlpha = opacity
        ctx.fillStyle   = `rgb(${cR},${cG},${cB})`
        ctx.font        = `${fw} ${n.fontSize}px Inter, sans-serif`
        ctx.fillText(n.text, 0, 0)
        ctx.restore()
      })

      raf = requestAnimationFrame(tick)
    }

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onLeave()  { mouse.x = -9999; mouse.y = -9999 }
    function onResize() {
      W = window.innerWidth
      H = section.offsetHeight || window.innerHeight
      isMobile = W < 768
      canvas.width  = W
      canvas.height = H
      names.forEach(n => { n.x = n.rx * W; n.y = n.ry * H })
    }

    resize()

    // Wait for Inter to be in the font cache before first frame
    document.fonts.ready.then(() => {
      raf = requestAnimationFrame(tick)
    })

    window.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #111810 0%, #0f2318 70%, #1a3a28 100%)' }}
    >
      <canvas
        ref={canvasRef}
        data-hero-canvas
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-8">
        <h1
          className="font-display font-bold text-beige leading-[1.06] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(32px,5.5vw,56px)' }}
        >
          Your most underutilized asset<br />
          isn&apos;t financial.{' '}
          <span style={{ color: '#2D9E5F' }}>It&apos;s human.</span>
        </h1>

        <p
          className="font-sans text-[14px] leading-[1.75] max-w-[520px] text-center"
          style={{ marginTop: '20px', color: 'rgba(232,221,208,0.55)' }}
        >
          We deploy inside your organization, turning your people knowledge into
          living infrastructure and connecting it to the market. So whenever your
          firm needs to know something about people: a hire, a prospect, a
          relationship, a signal — the answer is already there. Yesterday.
        </p>

        <div className="mt-8 pointer-events-auto">
          <a
            href="#start"
            className="animate-hero-float inline-block font-sans text-[13px] font-semibold text-dark bg-beige hover:bg-beige/90 px-5 py-2 rounded-full transition-colors duration-200"
            style={{ letterSpacing: '0.04em' }}
          >
            Get Started
          </a>
        </div>
      </div>

      <div
        className="animate-bob absolute bottom-7 left-1/2 z-20 flex flex-col items-center gap-1.5"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <div
          className="w-px h-7"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,221,208,0.3))' }}
        />
        <div
          className="w-2.5 h-2.5 border-r border-b"
          style={{ borderColor: 'rgba(232,221,208,0.4)', transform: 'rotate(45deg)', marginTop: '-4px' }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(17,24,16,0.5))' }}
      />
    </section>
  )
}
