import React, { useState } from 'react'
import './Project.css'
import { workImgPath as imgPath } from '../../../Data'

export default function Project (props) {
  const { folder, images, title } = props.project
  const [selected, setSelected] = useState({
    state: false,
    width: 0,
    height: 0,
    div: null
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
    document.querySelector('#inner-project-container').style.filter =
      'blur(30px)'
    setTimeout(() => {
      div.style.transition = '0.5s'
      const container = document.querySelector('#inner-project-container')
      const mx = container.offsetWidth / 2.0
      const my = container.offsetHeight / 2.0
      const width = container.offsetWidth * 0.9
      const height = container.offsetHeight * 0.9
      const fx = mx - width / 2.0 - x - nav.offsetWidth
      const fy = my - height / 2.0 - y
      div.style.width = '90vw'
      div.style.height = '90vh'
      div.style.transform = `translate(${fx}px, ${fy}px)`
    }, 0)

    setTimeout(() => {
      div.querySelector('img').style.objectFit = 'contain'
    }, 100)

    div.querySelector('img').src = path
    selected.width = target.offsetWidth
    selected.height = target.offsetHeight
    selected.state = true
    selected.div = target
    setSelected({ ...selected })
  }

  const minimizeImage = target => {
    target.style.transform = ''
    target.style.width = selected.width + 'px'
    target.style.height = selected.height + 'px'
    document.querySelector('#inner-project-container').style.filter = ''

    setTimeout(() => {
      target.querySelector('img').style.objectFit = ''
    }, 300)

    setTimeout(() => {
      target.style.transition = ''
      target.style.width = '0'
      target.style.height = '0'
      target.querySelector('img').src = '#'
    }, 500)

    selected.state = false
    setSelected({ ...selected })
  }

  const waitForTransition = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(0)
      }, 500)
    })
  }

  const navigateImage = async next => {
    minimizeImage(document.querySelector('#selected-image-container'))
    await waitForTransition()
    const divs = document.querySelectorAll('.small-image-container')
    let div = null
    let path = ''

    for (let i = 0; i < divs.length; i++) {
      if (divs[i] === selected.div) {
        let ix = next ? i + 1 : i - 1

        if (next && i === divs.length - 1) ix = 0
        if (!next && i === 0) ix = divs.length - 1

        div = divs[ix]
        path = `${imgPath}${folder}${images[ix]}`
        break
      }
    }

    enlargeImage(div, path)
  }

  return (
    <div id='main-project-container'>
      <div id='selected-image-container'>
        <span
          id='next-image'
          onClick={event => {
            navigateImage(true)
          }}
        >
          <span>&#62;</span>
        </span>
        <span
          id='previous-image'
          onClick={event => {
            navigateImage(false)
          }}
        >
          <span>&#60;</span>
        </span>
        <span
          id='close-image'
          onClick={event => {
            if (!selected.state) return
            minimizeImage(document.querySelector('#selected-image-container'))
          }}
        >
          x
        </span>
        <img id='selected-image' src='#' alt='' />
      </div>
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
                    `${imgPath}${folder}${image}`
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
    </div>
  )
}
