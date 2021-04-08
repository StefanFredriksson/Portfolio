import React from 'react'
import './Homepage.css'
import Greeting from './Greeting/Greeting'
import Avatar from './Avatar/Avatar'

export default function Homepage () {
  return (
    <div id='homepage-container'>
      <Greeting />
      <Avatar />
    </div>
  )
}
