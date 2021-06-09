import React, { useEffect } from 'react'
import './Homepage.css'
import Greeting from './Greeting/Greeting'
import Avatar from './Avatar/Avatar'
import { motion } from 'framer-motion'
import { pageTransition } from '../../Data'

export default function Homepage () {
  return (
    <motion.div
      id='homepage-container'
      initial='initial'
      animate='in'
      exit='out'
      variants={pageTransition.variants}
    >
      <Greeting />
    </motion.div>
  )
}
