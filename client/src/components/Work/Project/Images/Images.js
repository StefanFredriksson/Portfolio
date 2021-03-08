import React from 'react'
import { enlargeImage } from './imageLogic'

export default function Images (props) {
  const { title, selected, setSelected, images, imgPath, folder } = props
  return (
    <div id='inner-project-container'>
      <div id='project-title'>
        <h1>{title}</h1>
      </div>

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
      <div id='project-navigation-container'>
        <div
          id='go-back'
          onClick={event => {
            props.setShowProject(false)
          }}
        >
          Go back
        </div>
        <div id='images'>Images</div>
        <div id='videos'>Videos</div>
      </div>
    </div>
  )
}
