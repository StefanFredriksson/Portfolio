import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Videos.css'
import {
  workImgPath as imgPath,
  workVideoPath as videoPath,
  mediaAnimation
} from '../../../../Data'

export default function Videos (props) {
  const { videos, folder, selected, setSelected, showImages } = props
  const [offset, setOffset] = useState(0)

  const setVideo = () => {
    setTimeout(() => {
      const v = document.querySelector('#selected-video-container')
      if (!v) setVideo()
      else {
        v.style.width = '90%'
        v.style.height = '90%'
        v.style.transform = 'translate(-50%, -50%)'
      }
    }, 100)
  }

  const previous = event => {
    const container = document.querySelector('#videos-container')
    const videoContainers = container.querySelectorAll('.video-thumbnail')

    if (offset >= 0) return

    const tempOffset = offset + container.offsetWidth
    for (const video of videoContainers) {
      video.style.transform = `translateX(${tempOffset}px)`
    }
    setOffset(tempOffset)
  }
  const next = event => {
    const container = document.querySelector('#videos-container')
    const videoContainers = container.querySelectorAll('.video-thumbnail')

    if (atEnd(container.offsetWidth, videoContainers[0].offsetWidth)) return

    const tempOffset = offset - container.offsetWidth
    for (const video of videoContainers) {
      video.style.transform = `translateX(${tempOffset}px)`
    }

    setOffset(tempOffset)
  }

  const atEnd = (width, videoWidth) => {
    const length = videos.length
    if (length === 0 || !length) return true

    const fullWidth = videoWidth * length
    return offset * -1 >= fullWidth - width
  }

  return (
    <AnimatePresence>
      {!showImages && (
        <motion.div
          id='videos-container'
          initial='initial'
          animate='in'
          exit='out'
          variants={mediaAnimation.variants}
        >
          <div id='videos'>
            {videos.map(v => {
              return (
                <div
                  className='video-thumbnail'
                  onClick={event => {
                    selected.state = true
                    selected.src = `${videoPath}${folder}${v.src}`
                    setSelected({ ...selected })
                    setVideo()
                  }}
                >
                  <span className='view-video'>Watch video</span>
                  <img src={`${imgPath}${folder}${v.thumbnail}`} alt='' />
                </div>
              )
            })}
          </div>
          <div id='video-navigation'>
            <span onClick={previous}>&#60;</span>
            <span onClick={next}>&#62;</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
