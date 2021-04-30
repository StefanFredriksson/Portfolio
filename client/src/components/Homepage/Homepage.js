import React, { useEffect } from 'react'
import './Homepage.css'
import Greeting from './Greeting/Greeting'
import Avatar from './Avatar/Avatar'
import { initCanvas } from './HomeCanvas/HomeCanvas'

export default function Homepage () {
  useEffect(() => {
    initCanvas()
  }, [])
  return (
    <div id='homepage-container'>
      <Greeting />
      <Avatar />
    </div>
  )
}
