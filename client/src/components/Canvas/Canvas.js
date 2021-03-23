import React, { useEffect } from 'react'
import './Canvas.css'
import { init, animate } from './CanvasLogic'

export default function Canvas () {
  useEffect(() => {
    init()
    animate()
  }, [])

  return (
    <div id='main-canvas-container'>
      <canvas />
    </div>
  )
}
