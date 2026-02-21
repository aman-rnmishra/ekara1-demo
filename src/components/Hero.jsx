import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const journeyStep = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.15, duration: 0.4 },
  }),
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg" />
      {/* Floating orbs */}
      <div className="hero__orbs" aria-hidden="true">
        <motion.span
          className="hero__orb hero__orb--1"
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="hero__orb hero__orb--2"
          animate={{
            x: [0, -12, 18, 0],
            y: [0, 15, -8, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="hero__orb hero__orb--3"
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -10, 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.div
        className="container hero__container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__label" variants={item}>
          India's Unified Finance Ecosystem
        </motion.p>
        <motion.h1 className="hero__title" variants={item}>
          Empowering <span className="highlight">Individuals, Startups & Enterprises</span>
        </motion.h1>
        <motion.p className="hero__tagline" variants={item}>
          A 360° financial partner powering every stage of your financial journey.
        </motion.p>
        <motion.div className="hero__cta" variants={item}>
          <motion.a
            href="#contact"
            className="btn btn--primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Connect Today
          </motion.a>
          <motion.a
            href="#startup-suite"
            className="btn btn--outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Our Services
          </motion.a>
        </motion.div>
        <motion.div className="hero__journey" variants={item}>
          <span className="hero__journey-label">Your journey</span>
          <div className="hero__journey-track">
            <span className="hero__journey-rail" aria-hidden="true">
              <motion.span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '100%',
                  background: 'linear-gradient(90deg, var(--green-400), var(--green-500))',
                  borderRadius: 1,
                  transformOrigin: 'left',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </span>
            <motion.span
              className="hero__journey-dot"
              aria-hidden="true"
              animate={{
                left: ['12%', '50%', '88%', '12%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              style={{
                position: 'absolute',
                left: '12%',
                top: '50%',
                width: 10,
                height: 10,
                marginTop: -5,
                marginLeft: -5,
                background: 'var(--green-500)',
                borderRadius: '50%',
                boxShadow: '0 0 0 3px var(--white), 0 2px 8px rgba(22, 163, 74, 0.4)',
                zIndex: 2,
              }}
            />
            {[
              { icon: 'start', name: 'Start' },
              { icon: 'grow', name: 'Grow' },
              { icon: 'scale', name: 'Scale' },
            ].map((step, i) => (
              <motion.span
                key={step.name}
                className="hero__journey-step"
                variants={journeyStep}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <span className="hero__journey-step-icon">
                  {step.icon === 'start' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="5.5" cy="17.5" r="2.5" /><circle cx="18.5" cy="17.5" r="2.5" />
                      <path d="M5.5 17.5h3l2-6 2 6h4" /><path d="M8.5 17.5V11" />
                    </svg>
                  )}
                  {step.icon === 'grow' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 17h14v-4H5v4Z" /><path d="M5 13V9l3-4h8l3 4v4" />
                      <circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" />
                    </svg>
                  )}
                  {step.icon === 'scale' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  )}
                </span>
                <span className="hero__journey-step-name">{step.name}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
