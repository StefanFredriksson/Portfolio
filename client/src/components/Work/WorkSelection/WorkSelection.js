import React from 'react'
import './WorkSelection.css'
import { workText } from './workText'
import { tsp } from './ProjectData/TSP'
import { gol } from './ProjectData/3DGoL'
import { fiveInARow } from './ProjectData/FiveInARow'

export default function WorkSelection (props) {
  const data = [tsp, gol, fiveInARow]
  return (
    <div id='outer-work-container'>
      <div id='text-work-container'>{workText}</div>
      <div id='inner-work-container'>
        {data.map(d => {
          return (
            <div
              onClick={event => {
                props.setProject(d)
                props.setShowProject(true)
              }}
            >
              <span className='view-project'>View project</span>
              <img src={d.thumbnail} alt='' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
