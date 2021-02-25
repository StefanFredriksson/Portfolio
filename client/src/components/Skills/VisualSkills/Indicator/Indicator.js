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
      <div className='indicator-bar'>
        <span className='outer-bar'>
          <span
            className='inner-bar'
            style={{
              width: props.width,
              background: props.background,
              boxShadow: `0 0 5px ${props.background}`
            }}
          />
        </span>
      </div>
    </div>
  )
}
