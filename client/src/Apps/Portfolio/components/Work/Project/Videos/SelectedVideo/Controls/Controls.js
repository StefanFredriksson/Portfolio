import React, { useEffect, useState } from 'react'
import './Controls.css'

export default function Controls () {
  const [video, setVideo] = useState({
    current: '',
    duration: ''
  })
  const [isDown, setIsDown] = useState(false)

  useEffect(() => {
    handleControls()
  }, [])

  const handleControls = () => {
    window.requestAnimationFrame(checkTime)
  }

  const mouseDown = event => {
    event.stopPropagation()
    setIsDown(true)
    barClick(event)
  }

  const mouseUp = event => {
    setIsDown(false)
  }

  const checkTime = () => {
    const v = document.querySelector('video')
    if (!v) return
    const time = v.currentTime / v.duration
    const played = document.querySelector('#time-played')
    played.style.width = `${time * 100}%`
    video.current = convertTime(+v.currentTime.toFixed(0))
    video.duration = convertTime(+v.duration.toFixed(0))
    setVideo({ ...video })
    window.requestAnimationFrame(checkTime)
  }

  const convertTime = time => {
    const minutes = Math.floor((time / 60) % 60)
    const seconds = Math.floor(time % 60)
    return `${minutes < 0 ? 0 : minutes}:${
      seconds < 10 ? `0${seconds < 0 ? 0 : seconds}` : seconds
    }`
  }

  const barHover = event => {
    if (isDown) barClick(event)
    const target = event.currentTarget
    const val = getBarVal(event)
    const hover = target.querySelector('#hover-time')
    hover.style.left = `${val * 100}%`
    const v = document.querySelector('video')
    const targetTime = v.duration * val
    hover.textContent = convertTime(targetTime)
  }

  const barClick = event => {
    const val = getBarVal(event)
    const v = document.querySelector('video')
    const targetTime = v.duration * val
    v.currentTime = targetTime
  }

  const getBarVal = event => {
    const target = event.currentTarget
    const x = event.clientX - target.getBoundingClientRect().x
    return x / target.offsetWidth
  }

  return (
    <div
      id='video-controls'
      onMouseEnter={event =>
        (document.querySelector('#cursor').style.display = 'none')
      }
      onMouseLeave={event =>
        (document.querySelector('#cursor').style.display = 'flex')
      }
    >
      <span id='current-time'>{video.current}</span>
      <span
        id='time-bar'
        onMouseEnter={event => {
          event.currentTarget.querySelector('#hover-time').style.display =
            'flex'
        }}
        onMouseLeave={event => {
          event.currentTarget.querySelector('#hover-time').style.display =
            'none'
          setIsDown(false)
        }}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={barHover}
      >
        <span id='hover-time' />
        <span id='time-played'>
          <span id='time-position' />
        </span>
      </span>
      <span id='duration'>{video.duration}</span>
    </div>
  )
}
