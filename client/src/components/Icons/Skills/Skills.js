import React from 'react'

export default function Skills (props) {
  return (
    <div className={`${props.path} nav-icon`}>
      <svg>
        <path
          d='M23.8,12.3c0-0.1-3.2,1-3.2,0.9c-0.2-0.9-0.6-2.2-1-2.9c0,0,3.2-1.6,3.1-1.7
  c-0.5-0.9-2.2-2.9-3-3.5c-0.1-0.1-1.8,3.2-1.9,3.1c-0.9-0.7-2.6-1.7-3.7-1.9c-0.1,0,0.7-2.9,0.7-2.9c-0.6-0.1-4.1-0.1-4.7,0.1
  c-0.1,0,0.7,2.9,0.7,2.9C9.8,6.6,8,7.6,7.2,8.2c-0.1,0-1.5-2.9-1.5-2.8c-1,0.7-2.4,2.3-3,3.4c0,0.1,2.8,1.6,2.7,1.7
  c-0.4,0.7-0.7,1.7-0.9,2.7c0,0.1-3.5-1.5-3.5-1.4c-0.1,0.5,0,4.6,0,5c0,0.4,3.3-1.2,3.4-0.8c0,0.1,0,0.2,0,0.2
  c0.2,1,0.5,1.9,0.9,2.7c0,0-3.5,0.9-3.5,1c0.4,0.8,2.7,3.5,3.3,4c0,0,1.9-2.8,1.9-2.7c1,0.9,2.3,1.6,3.6,1.9c0,0-1.1,3.3-1,3.3
  c0.5,0.1,4.8,0.1,5.3,0c0.1,0-1-3.2-0.9-3.2c1.4-0.3,2.7-0.9,3.7-1.9c0,0,1.5,3.5,1.6,3.5c0.6-0.5,3.3-3.1,3.7-3.8
  c0,0-3.7-1.8-3.6-1.8c0.5-0.9,0.9-1.9,1.1-2.9c0-0.1,3.1,0.5,3.1,0.5C23.8,16.3,23.9,12.9,23.8,12.3z'
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
        <circle
          cx='12.5'
          cy='15'
          r='2.5'
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
      </svg>
    </div>
  )
}
