import React from 'react'
import './Alarm.css'
import Timer from './Timer/Timer'

export default function Alarm () {
  const defaultTime = 15
  return (
    <div id='main-alarm-container'>
      <Timer defaultTime={defaultTime} />
    </div>
  )
}
