import React from 'react'
import './SelectedVideo.css'
import Controls from './Controls/Controls'

export default function SelectedVideo (props) {
  const { src, selected, setSelected } = props
  return (
    <div id='selected-video-container'>
      <span
        id='close-video'
        onClick={event => {
          selected.state = false
          selected.src = ''
          setSelected({ ...selected })
        }}
      >
        X
      </span>
      <video id='work-video' src={src} autoPlay />
      <Controls />
    </div>
  )
}
