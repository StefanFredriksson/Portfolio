import React from 'react'
import HomeIcon from '../../../Icons/Home/Home'

export default function Homepage ({ stroke, sWidth, fill, path }) {
  return (
    <div className='path-container'>
      <label>Home</label>
      <HomeIcon stroke={stroke} sWidth={sWidth} fill={fill} path={path} />
    </div>
  )
}
