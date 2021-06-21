import React from 'react'
import AboutIcon from '../../../Icons/About/About'

export default function About ({ stroke, sWidth, fill, path }) {
  return (
    <div className={`${path} path-container`}>
      <label>About</label>
      <AboutIcon stroke={stroke} sWidth={sWidth} fill={fill} path={path} />
    </div>
  )
}
