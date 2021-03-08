import React from 'react'
import './Images.css'
import { enlargeImage } from './imageLogic'

export default function Images (props) {
  const { selected, setSelected, images, imgPath, folder } = props
  return (
    <div id='project-media-container'>
      {images.map(image => {
        return (
          <div
            className='small-image-container'
            onClick={event => {
              if (selected.state) return
              enlargeImage(
                event.currentTarget,
                `${imgPath}${folder}${image}`,
                selected,
                setSelected
              )
            }}
          >
            <span className='view-media'>View image</span>
            <img src={`${imgPath}${folder}${image}`} alt='' />
          </div>
        )
      })}
    </div>
  )
}
