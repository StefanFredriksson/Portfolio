import React from 'react'
import './AppThumbnail.css'
import { Link } from 'react-router-dom'

export default function AppThumbnail ({ path, src, title }) {
  return (
    <div className='app-thumbnail' style={{ transform: 'scale(0)' }}>
      <Link to={path}>
        <img src={`img/appnav/${src}`} alt={src} />
      </Link>
      <span className='frosty' />
      <label className='app-title'>{title}</label>
    </div>
  )
}
