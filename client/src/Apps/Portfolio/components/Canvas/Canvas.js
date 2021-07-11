import React, { useContext } from 'react'
import { StateContext } from '../../../../Store'
import './Canvas.css'
import Tendril from './Tendril/Tendrils'

export default function Canvas () {
  const [state] = useContext(StateContext)

  return (
    <div id='main-canvas-container'>
      <Tendril color={state.trail} navSwap={state.navSwap} />
    </div>
  )
}
