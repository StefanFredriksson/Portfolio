import React, { useEffect } from 'react'
import './Homepage.css'

export default function Homepage () {
  useEffect(() => {
    const spans = document.querySelectorAll('.bounce')

    for (const span of spans) {
      span.addEventListener('mouseover', e => {
        span.classList.add('animated')
      })

      span.addEventListener('animationend', e => {
        span.classList.remove('animated')
      })
    }

    moveOrbs()
  }, [])

  const moveOrbs = () => {
    const nav = document.querySelector('#navigation-container')
    const home = document.querySelector('#homepage-container')
    const o = document.querySelectorAll('.orb')
    const orbs = []
    for (const orb of o) {
      const tempOrb = { element: orb, x: 0, y: 0, maxDistance: 0, distance: 0 }
      resetOrb(tempOrb)
      orbs.push(tempOrb)
    }

    setInterval(() => {
      for (const orb of orbs) {
        const pos = orb.element.getBoundingClientRect()
        const moveX = pos.x + orb.x - nav.offsetWidth
        const moveY = pos.y + orb.y

        if (
          moveX + orb.element.offsetWidth >= home.offsetWidth ||
          moveX < 0 ||
          moveY + orb.element.offsetHeight >= home.offsetHeight ||
          moveY < 0
        ) {
          resetOrb(orb)
        } else if (orb.distance >= orb.maxDistance) {
          resetOrb(orb)
          orb.element.style.left = `${moveX}px`
          orb.element.style.top = `${moveY}px`
        } else {
          orb.distance++
          orb.element.style.left = `${moveX}px`
          orb.element.style.top = `${moveY}px`
        }
      }
    }, 1)
  }

  const resetOrb = orb => {
    orb.x = Math.floor(Math.random() * 3 - 1)
    orb.y = Math.floor(Math.random() * 3 - 1)
    orb.maxDistance = Math.floor(Math.random() * 300)
    orb.distance = 0
  }

  return (
    <div id='homepage-container'>
      <span className='orb' />
      <span className='orb' />
      <span className='orb' />
      <span className='orb' />
      <span className='orb' />
      <span className='orb' />
      <span className='orb' />
      <span className='orb' />
      <span className='orb' />

      <div id='welcome-container'>
        <h1>
          <span className='bounce'>H</span>
          <span className='bounce'>e</span>
          <span className='bounce'>l</span>
          <span className='bounce'>l</span>
          <span className='bounce'>o</span>
          <span className='bounce'>,</span>
          <br />
          <span className='bounce'>I</span>
          <span className='bounce'>'</span>
          <span className='bounce'>m</span>
          &nbsp;
          <span className='bounce'>S</span>
          <span className='bounce'>t</span>
          <span className='bounce'>e</span>
          <span className='bounce'>f</span>
          <span className='bounce'>a</span>
          <span className='bounce'>n</span>
          <span className='bounce'>.</span>
          <br />
          <span className='bounce'>W</span>
          <span className='bounce'>e</span>
          <span className='bounce'>l</span>
          <span className='bounce'>c</span>
          <span className='bounce'>o</span>
          <span className='bounce'>m</span>
          <span className='bounce'>e</span>
          &nbsp;
          <span className='bounce'>t</span>
          <span className='bounce'>o</span>
          &nbsp;
          <span className='bounce'>m</span>
          <span className='bounce'>y</span>
          &nbsp;
          <span className='bounce'>p</span>
          <span className='bounce'>o</span>
          <span className='bounce'>r</span>
          <span className='bounce'>t</span>
          <span className='bounce'>f</span>
          <span className='bounce'>o</span>
          <span className='bounce'>l</span>
          <span className='bounce'>i</span>
          <span className='bounce'>o</span>
          <span className='bounce'>.</span>
        </h1>
        <h2>Full stack web developer</h2>
      </div>
    </div>
  )
}
