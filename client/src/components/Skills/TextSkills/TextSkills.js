import React from 'react'
import './TextSkills.css'
import { lines } from './Text'
import Line from './Line/Line'

export default function TextSkills () {
  return (
    <div id='text-skills-container'>
      <div id='skills-text'>
        {lines.map((line, i) => {
          return <Line text={line} index={i} />
        })}
      </div>
    </div>
  )
}
