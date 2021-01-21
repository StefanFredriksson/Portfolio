import React from 'react'
import './Home.css'

export default function Home (props) {
  return (
    <div className='home-icon'>
      <svg>
        <line
          x1='5'
          y1='15'
          x2='5'
          y2='25'
          stroke={props.stroke}
          stroke-width={props.sWidth}
        />
        <line
          x1='5'
          y1='25'
          x2='20'
          y2='25'
          stroke={props.stroke}
          stroke-width={props.sWidth}
        />
        <line
          x1='20'
          y1='25'
          x2='20'
          y2='15'
          stroke={props.stroke}
          stroke-width={props.sWidth}
        />
        <line
          x1='12'
          y1='5'
          x2='0'
          y2='16'
          stroke={props.stroke}
          stroke-width={props.sWidth}
        />
        <line
          x1='12'
          y1='5'
          x2='25'
          y2='16'
          stroke={props.stroke}
          stroke-width={props.sWidth}
        />
      </svg>
    </div>
  )
}
