import React from 'react'
import { enlargeImage, minimizeImage } from '../imageLogic'

export default function SelectedImage (props) {
  const { images, selected, setSelected, folder, imgPath } = props

  const waitForTransition = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(0)
      }, 500)
    })
  }

  const navigateImage = async next => {
    minimizeImage(
      document.querySelector('#selected-image-container'),
      selected,
      setSelected
    )
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

    enlargeImage(div, path, selected, setSelected)
  }

  return (
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
          minimizeImage(
            document.querySelector('#selected-image-container'),
            selected,
            setSelected
          )
        }}
      >
        x
      </span>
      <img id='selected-image' src='#' alt='' />
    </div>
  )
}
