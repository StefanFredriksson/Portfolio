import React from 'react'
import './Videos.css'
import {
  workImgPath as imgPath,
  workVideoPath as videoPath
} from '../../../../Data'

export default function Videos (props) {
  const { videos, folder, selected, setSelected } = props
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
