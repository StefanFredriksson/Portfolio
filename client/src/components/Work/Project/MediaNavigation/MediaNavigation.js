import React, { useState, useContext, useEffect } from 'react'
import './MediaNavigation.css'
import {
  nextImages,
  prevImages,
  atEnd as imageAtEnd
} from '../Images/imageLogic'
import { StateContext } from '../../../../Store'

export default function MediaNavigation (props) {
  const { showImages, images, videos } = props
  const [videoOffset, setVideoOffset] = useState(0)
  const [state, setState] = useContext(StateContext)
  const [nextActive, setNextActive] = useState(false)
  const [prevActive, setPrevActive] = useState(false)

  useEffect(() => {
    setVideoOffset(0)
    state.imageNav.offset = 0
    setState({ ...state })
    setActive()
  }, [showImages])

  useEffect(() => {
    setActive()
  }, [videoOffset, state.imageNav.offset])

  const previous = event => {
    showImages ? previousImages() : previousVideos()
    setActive()
  }

  const previousImages = () => {
    if (state.imageNav.offset >= 0) return

    const offset = prevImages(state.imageNav.offset)
    state.imageNav.offset = offset
    setState({ ...state })
  }

  const previousVideos = () => {
    const container = document.querySelector('#videos-container')
    const videoContainers = container.querySelectorAll('.video-thumbnail')

    if (videoOffset >= 0) return

    const tempOffset = videoOffset + container.offsetWidth
    for (const video of videoContainers) {
      video.style.transform = `translateX(${tempOffset}px)`
    }
    setVideoOffset(tempOffset)
  }

  const next = event => {
    showImages ? nextImgs() : nextVideos()
    setActive()
  }

  const nextImgs = () => {
    const offset = nextImages(state.imageNav.offset, images)
    state.imageNav.offset = offset
    setState({ ...state })
  }

  const nextVideos = () => {
    const container = document.querySelector('#videos-container')
    const videoContainers = container.querySelectorAll('.video-thumbnail')

    if (videoAtEnd()) return

    const tempOffset = videoOffset - container.offsetWidth
    for (const video of videoContainers) {
      video.style.transform = `translateX(${tempOffset}px)`
    }

    setVideoOffset(tempOffset)
  }

  const videoAtEnd = () => {
    const container = document.querySelector('#videos-container')
    const videoContainers = container.querySelectorAll('.video-thumbnail')
    const width = container.offsetWidth
    const videoWidth = videoContainers[0].offsetWidth
    const length = videos.length

    if (length === 0 || !length) return true

    const fullWidth = videoWidth * length
    return videoOffset * -1 >= fullWidth - width
  }

  const atStart = () => {
    return showImages ? state.imageNav.offset === 0 : videoOffset === 0
  }

  const atEnd = () => {
    return showImages ? imageAtEnd(images, state.imageNav.offset) : videoAtEnd()
  }

  const setActive = () => {
    const next = atEnd()
    const prev = atStart()
    setNextActive(next)
    setPrevActive(prev)
  }

  return (
    <div id='media-navigation'>
      <span
        onClick={previous}
        className={prevActive ? 'prev-disabled' : 'prev-active'}
      >
        &#60;
      </span>
      <span
        onClick={next}
        className={nextActive ? 'next-disabled' : 'next-active'}
      >
        &#62;
      </span>
    </div>
  )
}
