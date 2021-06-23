import React from 'react'
import './FlashMessage.css'
import { motion, AnimatePresence } from 'framer-motion'
import { flashVariants } from '../../../../../Data'

export default function FlashMessage ({ state }) {
  return (
    <AnimatePresence>
      {state.show && (
        <motion.div
          id='contact-flash-message'
          variants={flashVariants}
          initial='initial'
          animate='in'
          exit='out'
        >
          <h2>{state.message}</h2>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
