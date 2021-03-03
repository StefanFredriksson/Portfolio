import React, { useState } from 'react'
import './Project.css'
import { workImgPath as imgPath } from '../../../Data'

export default function Project (props) {
  const { folder, images, title } = props.project
  const [selected, setSelected] = useState({
    state: false,
    width: 0,
    height: 0
  })

  const enlargeImage = (target, path) => {
    const nav = document.querySelector('#navigation-container')
    const div = document.querySelector('#selected-image-container')
    const pos = target.getBoundingClientRect()
    const x = pos.x - nav.offsetWidth
    const y = pos.y
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    div.style.width = target.offsetWidth + 'px'
    div.style.height = target.offsetHeight + 'px'
    setTimeout(() => {
      div.style.transition = '0.5s'
      const container = document.querySelector('#main-project-container')
      const mx = container.offsetWidth / 2.0
      const my = container.offsetHeight / 2.0
      const width = container.offsetWidth * 0.9
      const height = container.offsetHeight * 0.9
      const fx = mx - width / 2.0 - x
      const fy = my - height / 2.0 - y
      div.style.width = '90vw'
      div.style.height = '90vh'
      div.style.transform = `translate(${fx}px, ${fy}px)`
    }, 0)

    div.querySelector('img').src = path
    selected.width = target.offsetWidth
    selected.height = target.offsetHeight
    selected.state = true
    setSelected({ ...selected })
  }

  const minimizeImage = target => {
    target.style.transform = ''
    target.style.width = selected.width + 'px'
    target.style.height = selected.height + 'px'

    setTimeout(() => {
      target.style.transition = ''
      target.style.width = '0'
      target.style.height = '0'
    }, 500)

    selected.state = false
    setSelected({ ...selected })
  }

  return (
    <div id='main-project-container'>
      <div id='project-title'>
        <h1>{title}</h1>
      </div>
      <div
        id='selected-image-container'
        onClick={event => {
          if (!selected.state) return
          minimizeImage(event.currentTarget)
        }}
      >
        <img id='selected-image' src='#' alt='' />
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
                  `${imgPath}${folder}${image.path}`
                )
              }}
            >
              <span className='view-media'>View image</span>
              <img src={`${imgPath}${folder}${image.path}`} alt='' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
