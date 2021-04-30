import React from 'react'
import './Scroll.css'
import Homepage from '../Homepage/Homepage'
import About from '../About/About'
import Skills from '../Skills/Skills'

export default function Scroll () {
  return (
    <div id='scroll-container'>
      <Homepage />
      <About />
      <Skills />
    </div>
  )
}
