import React from 'react'
import './Work.css'

export default function Work (props) {
  return (
    <div className='work-icon'>
      <svg>
        <path
          d='M24,15c0,0-5.1-7.5-11.5-7.5S1,15,1,15s5.1,7.5,11.5,7.5S24,15,24,15z'
          stroke={props.stroke}
          stroke-width={props.sWidth}
        />
        <circle
          cx='12.5'
          cy='15'
          r='4'
          stroke={props.stroke}
          stroke-width={props.sWidth}
        />
      </svg>
    </div>
  )
}
