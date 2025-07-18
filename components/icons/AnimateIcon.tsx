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
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      variants={triangleVariants}
      // Ensure the rotation pivots around the center
      style={{ originX: '50%', originY: '50%' }}
      className={`${isOpen ? 'primary-text' : 'muted-text'}`}
    >
      {/* A simple right-pointing triangle */}
      {icon}
    </motion.div>
  )
}

export default AnimateIcon
