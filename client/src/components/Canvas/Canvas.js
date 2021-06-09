import React, { useEffect, useContext } from 'react'
import { StateContext } from '../../Store'
import './Canvas.css'
//import { init } from './CanvasLogic'
//import { init } from './MouseTrail'
import { initOscillator as init } from './Oscillator'
//import { initBackground as init } from './Background'

export default function Canvas () {
  const [state] = useContext(StateContext)
  useEffect(() => {
    init(state.trail, state.navSwap)
  }, [])

  return (
    <div id='main-canvas-container'>
      <canvas />
    </div>
  )
}
