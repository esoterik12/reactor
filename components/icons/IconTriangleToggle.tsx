import { motion } from 'framer-motion'

interface AnimateIcon {
  isOpen: boolean
  icon: React.ReactNode
}

const AnimateIcon: React.FC<AnimateIcon> = ({ isOpen, icon }) => {
  // Define the rotation animation for closed and open states
  const triangleVariants = {
    closed: {
      rotate: 0,
      transition: { duration: 0.2 }
    },
    open: {
      rotate: 90,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.svg
      width='20'
      height='20'
      viewBox='0 0 10 10'
      // Animate based on the isOpen prop
      animate={isOpen ? 'open' : 'closed'}
      variants={triangleVariants}
      // Ensure the rotation pivots around the center
      style={{ originX: '50%', originY: '50%' }}
      className={`${isOpen ? 'primary-text' : 'muted-text'}`}
    >
      {/* A simple right-pointing triangle */}
      {icon}
    </motion.svg>
  )
}

export default AnimateIcon
