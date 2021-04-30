import React from 'react'
import './Contact.css'

export default function Contact (props) {
  return (
    <div className='contact-icon'>
      <svg>
        <rect
          x='1.5'
          y='6.5'
          width='22'
          height='17'
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
        <polyline
          points='1.5,6.5 12.5,15 23.5,6.5 '
          stroke={props.stroke}
          stroke-width={props.sWidth}
          fill={props.fill}
        />
      </svg>
    </div>
  )
}
