import React from 'react'
import WorkIcon from '../../../Icons/Work/Work'

export default function Work ({ stroke, sWidth, fill, path }) {
  return (
    <div className={`${path} path-container`}>
      <label>Work</label>
      <WorkIcon stroke={stroke} sWidth={sWidth} fill={fill} path={path} />
    </div>
  )
}
