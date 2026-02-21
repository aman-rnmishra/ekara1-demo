import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal, StaggerReveal, CardReveal } from './Reveal'

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const start = performance.now()
    const step = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(ease * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, to])

  return (
    <span ref={ref}>
      <span className="impact__number">{count.toLocaleString('en-IN')}</span>
      <span className="impact__plus">{suffix}</span>
    </span>
  )
}

const stats = [
  { value: 6000, suffix: '+', label: 'Startups Engaged' },
  { value: 1000, suffix: '+', label: 'College Partners' },
  { value: 200, suffix: '+', label: 'Investment Partners' },
  { value: 500, suffix: '+', label: 'Incubation Centre Partners' },
]

export default function Impact() {
  return (
    <section className="section impact" id="impact">
      <div className="container">
        <Reveal className="section__header">
          <span className="section__label">Our Impact</span>
          <h2 className="section__title">Key Metrics</h2>
        </Reveal>
        <StaggerReveal className="impact__grid">
          {stats.map((stat) => (
            <CardReveal key={stat.label} className="impact__stat" subtle>
              <CountUp to={stat.value} suffix={stat.suffix} />
              <p>{stat.label}</p>
            </CardReveal>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
