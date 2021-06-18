import React from 'react'
import SkillsIcon from '../../../Icons/Skills/Skills'

export default function Skills ({ stroke, sWidth, fill, path }) {
  return (
    <div className='path-container'>
      <label>Skills</label>
      <SkillsIcon stroke={stroke} sWidth={sWidth} fill={fill} path={path} />
    </div>
  )
}
