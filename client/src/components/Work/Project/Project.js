import React from 'react'
import './Project.css'
import { workImgPath as imgPath } from '../../../Data'

export default function Project (props) {
  const { folder, images, title } = props.project
  return (
    <div id='main-project-container'>
      <div id='project-title'>
        <h1>{title}</h1>
      </div>
      <div id='project-media-container'>
        {images.map(image => {
          return (
            <div className='small-image-container'>
              <span className='view-media'>View image</span>
              <img src={`${imgPath}${folder}${image.path}`} alt='' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
