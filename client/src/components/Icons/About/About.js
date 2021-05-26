import React from 'react'

export default function About (props) {
  return (
    <div className={`${props.path} nav-icon`}>
      <svg>
        <circle
          cx='12.5'
          cy='7'
          r='6'
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
        <line
          x1='1'
          y1='25'
          x2='24'
          y2='25'
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
        <path
          d='M23.5,24.9c0-6.9-3.7-12.5-8.3-12.5'
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
        <path
          d='M1.5,25c0-7,3.7-12.6,8.3-12.6'
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
      </svg>
    </div>
  )
}
