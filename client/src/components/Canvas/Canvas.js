import React, { useEffect } from 'react'
import './Canvas.css'
//import { init } from './CanvasLogic'
//import { init } from './MouseTrail'
import { initOscillator as init } from './Oscillator'

export default function Canvas () {
  useEffect(() => {
    init()
  }, [])

  return (
    <div id='main-canvas-container'>
      <canvas />
    </div>
  )
}
