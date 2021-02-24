import React from 'react'
import './Skills.css'
import TextSkills from './TextSkills/TextSkills'
import VisualSkills from './VisualSkills/VisualSkills'

export default function Skills () {
  return (
    <div id='main-skills-container'>
      <span id='sun' />
      <span id='moon' />
      <TextSkills />
      <VisualSkills />
    </div>
  )
}
