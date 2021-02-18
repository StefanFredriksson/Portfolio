import React, { useEffect } from 'react'
import './Homepage.css'
import Greeting from './Greeting/Greeting'
import { mouseDown, mouseMove, mouseUp, initOrbs } from '../../logic/OrbLogic'

export default function Homepage () {
  const nrOrbs = []
  const orbs = []
  const orbCnt = 20
  const force = 3
  const mouse = {
    state: false,
    pos: { x: 0, y: 0 }
  }

  for (let i = 0; i < orbCnt; i++) nrOrbs.push(0)

  useEffect(() => {
    initOrbs(orbs, mouse, force)

    document
      .querySelector('#homepage-container')
      .addEventListener('mousedown', handleMouseDown)
    document
      .querySelector('#homepage-container')
      .addEventListener('mouseup', handleMouseUp)
    document
      .querySelector('#homepage-container')
      .addEventListener('mousemove', handleMouseMove)
  }, [])

  const handleMouseDown = event => {
    mouseDown(mouse, event)
  }

  const handleMouseUp = event => {
    mouseUp(mouse, orbs, force, event)
  }

  const handleMouseMove = event => {
    mouseMove(mouse, orbs, event)
  }

  return (
    <div id='homepage-container'>
      {nrOrbs.map(s => {
        return <span className='orb' />
      })}
      <Greeting />
    </div>
  )
}
