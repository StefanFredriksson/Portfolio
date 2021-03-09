import React, { useEffect, useState } from 'react'
import './Controls.css'

export default function Controls () {
  const [video, setVideo] = useState({ current: '0', duration: '60' })

  useEffect(() => {
    handleControls()
  }, [])

  const handleControls = () => {
    window.requestAnimationFrame(checkTime)
  }

  const checkTime = () => {
    const v = document.querySelector('video')
    const time = v.currentTime / v.duration
    const played = document.querySelector('#time-played')
    played.style.width = `${time * 100}%`
    window.requestAnimationFrame(checkTime)
  }

  return (
    <div id='video-controls'>
      <span>{video.current}</span>
      <span id='time-bar'>
        <span id='time-played'>
          <span id='time-position' />
        </span>
      </span>
      <span>{video.duration}</span>
    </div>
  )
}
