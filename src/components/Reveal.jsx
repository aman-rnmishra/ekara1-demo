import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
  hidden: {},
}

/* Scale-in: pop into view */
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* Blur-in: fade + blur */
const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* Slide from left/right */
const slideFromLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Reveal({ children, className = '', as: Component = 'div', delayOrder = 0, ...props }) {
  return (
    <motion.div
      as={Component}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={delayOrder}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function ScaleReveal({ children, className = '', ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={scaleIn}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function BlurReveal({ children, className = '', ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={blurIn}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideReveal({ children, className = '', from = 'left', ...props }) {
  const variants = from === 'right' ? slideFromRight : slideFromLeft
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerReveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      {children}
    </motion.div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function CardReveal({ children, className = '', shine = false, subtle = false, ...props }) {
  const hoverProps = subtle
    ? { whileHover: { y: -4 }, transition: { duration: 0.2 } }
    : {
        whileHover: {
          y: -8,
          scale: 1.02,
          rotateZ: 0.5,
          transition: { type: 'spring', stiffness: 400, damping: 25 },
        },
      }
  return (
    <motion.div
      className={`${className} ${shine ? 'card-shine' : ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      {...hoverProps}
      {...props}
    >
      {shine && <span className="card-shine__overlay" aria-hidden="true" />}
      {children}
    </motion.div>
  )
}

export { fadeUp, stagger }
