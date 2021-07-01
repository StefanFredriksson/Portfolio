import React, { useEffect, useContext } from 'react'
import { StateContext } from '../../../../Store'
import './Canvas.css'
import { initOscillator as init } from './Tendril'
import { useRouteMatch } from 'react-router-dom'

export default function Canvas () {
  const { path } = useRouteMatch()
  const [state] = useContext(StateContext)
  useEffect(() => {
    if (path !== 'portfolio') return
    init(state.trail, state.navSwap)
  }, [])

  return (
    <div id='main-canvas-container'>
      <canvas />
    </div>
  )
}
