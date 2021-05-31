import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import './Skills.css'
import TextSkills from './TextSkills/TextSkills'
import VisualSkills from './VisualSkills/VisualSkills'
import { pageTransition } from '../../Data'

export default function Skills () {
  useEffect(() => {
    const container = document.querySelector('#main-skills-container')
    container.addEventListener('mousemove', handleMouseMove)
  }, [])

  const handleMouseMove = event => {
    const nav = document.querySelector('#navigation-container')
    const orbs = document.querySelectorAll('.orb')
    const mx = event.clientX - nav.offsetWidth
    const my = event.clientY

    for (const orb of orbs) {
      const pos = orb.getBoundingClientRect()
      const orbX = pos.x - nav.offsetWidth
      const orbY = pos.y
      const x = orbX <= mx ? (mx - orbX) / 20 : ((orbX - mx) * -1) / 30
      const y = orbY <= my ? (my - orbY) / 20 : ((orbY - my) * -1) / 30
      orb.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  return (
    <motion.div
      id='main-skills-container'
      initial='initial'
      animate='in'
      exit='out'
      variants={pageTransition.variants}
      transition={pageTransition.transition}
    >
      <TextSkills />
      <VisualSkills />
    </motion.div>
  )
}

/*<span id='orb-1' className='orb' />
      <span id='orb-2' className='orb' />
      <span id='orb-3' className='orb' />
      <span id='orb-4' className='orb' /> */
