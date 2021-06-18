import React from 'react'
import { motion } from 'framer-motion'
import './Indicator.css'

export default function Indicator (props) {
  const animation = {
    initial: {
      width: 0
    },
    in: {
      width: props.width,
      transition: {
        delay: 0.2 + props.index * 0.2,
        duration: 1
      }
    }
  }

  return (
    <div className='skill-indicator-container'>
      <div className='skill-icons-container'>
        {props.icons.map(icon => {
          return <img className='skill-icon' src={icon} alt={props.title} />
        })}
      </div>
      <div className='indicator-bar'>
        <span className='outer-bar'>
          <motion.span
            className='inner-bar'
            style={{
              width: props.width,
              background: props.background,
              boxShadow: `0 0 5px ${props.background}`
            }}
            variants={animation}
            initial='initial'
            animate='in'
          />
        </span>
      </div>
    </div>
  )
}
