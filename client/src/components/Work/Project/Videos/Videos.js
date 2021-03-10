import React from 'react'
import './Videos.css'
import {
  workImgPath as imgPath,
  workVideoPath as videoPath
} from '../../../../Data'

export default function Videos (props) {
  const { videos, folder, selected, setSelected } = props

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
    <div id='videos-container'>
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
  )
}
