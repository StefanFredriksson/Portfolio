import React from 'react'
import './SelectedVideo.css'

export default function SelectedVideo (props) {
  const { src } = props
  return (
    <div id='selected-video-container'>
      <video src={src} controls />
    </div>
  )
}
