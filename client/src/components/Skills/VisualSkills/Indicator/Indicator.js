import React from 'react'
import './Indicator.css'

export default function Indicator (props) {
  return (
    <div className='skill-indicator-container'>
      <div className='skill-icons-container'>
        {props.icons.map(icon => {
          return <img className='skill-icon' src={icon} alt={props.title} />
        })}
      </div>
    </div>
  )
}
