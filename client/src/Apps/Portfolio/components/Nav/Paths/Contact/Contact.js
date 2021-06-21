import React from 'react'
import ContactIcon from '../../../Icons/Contact/Contact'

export default function Contact ({ stroke, sWidth, fill, path }) {
  return (
    <div className={`${path} path-container`}>
      <label>Contact</label>
      <ContactIcon stroke={stroke} sWidth={sWidth} fill={fill} path={path} />
    </div>
  )
}
