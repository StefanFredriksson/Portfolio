import React from 'react'
import './Line.css'
import { motion } from 'framer-motion'

export default function Line (props) {
  const animation = {
    initial: {
      y: 40
    },
    in: {
      y: 0,
      transition: {
        delay: 0.2 + props.index * 0.05,
        type: 'spring'
      }
    }
  }

  return (
    <motion.span
      className='skills-line'
      variants={animation}
      initial='initial'
      animate='in'
    >
      {props.text} <br />
    </motion.span>
  )
}
