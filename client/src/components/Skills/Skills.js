import React, { useEffect } from 'react'
import './Skills.css'
import TextSkills from './TextSkills/TextSkills'
import VisualSkills from './VisualSkills/VisualSkills'

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
      const x = orbX <= mx ? (mx - orbX) / 5 : ((orbX - mx) * -1) / 10
      const y = orbY <= my ? (my - orbY) / 5 : ((orbY - my) * -1) / 10
      orb.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  return (
    <div id='main-skills-container'>
      <span id='orb-1' className='orb' />
      <span id='orb-2' className='orb' />
      <span id='orb-3' className='orb' />
      <span id='orb-4' className='orb' />
      <TextSkills />
      <VisualSkills />
    </div>
  )
}
