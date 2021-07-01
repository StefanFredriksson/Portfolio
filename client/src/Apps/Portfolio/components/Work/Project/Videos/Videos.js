import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Videos.css'
import {
  workImgPath as imgPath,
  workVideoPath as videoPath,
  mediaAnimation
} from '../../../../../../Data'

export default function Videos (props) {
  const { videos, folder, selected, setSelected, showImages } = props

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

  return (
    <AnimatePresence>
      {!showImages && (
        <motion.div
          key='videos'
          id='videos-container'
          className='media-container'
          initial='initial'
          animate='in'
          exit='out'
          variants={mediaAnimation.variants}
        >
          <div id='videos'>
            {videos.map((v, i) => {
              return (
                <div
                  className='video-thumbnail project-thumbnail'
                  key={i.toString()}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
