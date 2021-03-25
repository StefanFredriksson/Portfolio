import React, { useEffect } from 'react'
import './Canvas.css'
//import { init } from './CanvasLogic'
//import { init } from './MouseTrail'
import { initOscillator } from './Oscillator'

export default function Canvas () {
  useEffect(() => {
    initOscillator(false)
  }, [])

  return (
    <div id='main-canvas-container'>
      <canvas />
    </div>
  )
}
