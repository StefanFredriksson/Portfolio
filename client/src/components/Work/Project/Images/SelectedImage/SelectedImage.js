import React, { useContext } from 'react'
import './SelectedImage.css'
import {
  enlargeImage,
  minimizeImage,
  nextImages,
  prevImages,
  moveToEnd,
  moveToStart
} from '../imageLogic'
import { StateContext } from '../../../../../Store'

export default function SelectedImage (props) {
  const { images, selected, setSelected, folder, imgPath } = props
  const [state, setState] = useContext(StateContext)

  const waitForTransition = (time = 500) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(0)
      }, time)
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

    let ix = state.imageNav.ix + (next ? 1 : -1)
    let offset = state.imageNav.offset
    if (ix < 0) {
      offset = moveToEnd(images)
      ix = images.length - 1
      await waitForTransition(1000)
    } else if (ix >= images.length) {
      offset = moveToStart()
      ix = 0
      await waitForTransition(1000)
    } else if (
      (next && (state.imageNav.ix + 1) % 4 === 0) ||
      (!next && state.imageNav.ix % 4 === 0)
    ) {
      if (next) {
        offset = nextImages(state.imageNav.offset, images)
      } else {
        offset = prevImages(state.imageNav.offset)
      }

      await waitForTransition(1000)
    }
    state.imageNav.offset = offset
    state.imageNav.ix = ix
    setState({ ...state })

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
        X
      </span>
      <img id='selected-image' src='#' alt='' />
    </div>
  )
}
