import React, { useEffect } from 'react'
import './SelectedVideo.css'
import Controls from './Controls/Controls'

export default function SelectedVideo (props) {
  const { src, selected, setSelected } = props

  useEffect(() => {
    document
      .querySelector('video')
      .addEventListener('ended', event => setCursorContent())
  }, [])

  const setCursorPos = event => {
    const target = event.currentTarget
    const pos = target.getBoundingClientRect()
    const x = event.clientX - pos.x
    const y = event.clientY - pos.y
    const left = (x / target.offsetWidth) * 100
    const top = (y / target.offsetHeight) * 100
    const csr = target.querySelector('#cursor')
    csr.style.left = `${left}%`
    csr.style.top = `${top}%`
    setCursorContent(target)
  }

  const videoPaused = () => {
    const v = document.querySelector('video')
    return v.paused
  }

  const videoEnded = () => {
    const v = document.querySelector('video')
    return v.ended
  }

  const setCursorContent = (
    target = document.querySelector('#selected-video-container')
  ) => {
    const csr = target.querySelector('#cursor')
    csr.textContent =
      videoPaused() && videoEnded()
        ? '\uf01e'
        : videoPaused()
        ? '\uf04b'
        : '\uf04c'
  }

  const videoAction = event => {
    if (event.target.id !== 'cursor') return
    const target = event.currentTarget
    const v = target.querySelector('video')
    if (videoPaused() && videoEnded()) {
      v.currentTime = 0
      v.play()
    } else if (videoPaused()) v.play()
    else v.pause()
    setCursorContent(target)
  }

  return (
    <div
      id='selected-video-container'
      onMouseEnter={event => {
        event.currentTarget.querySelector('#cursor').style.display = 'flex'
        setCursorPos(event)
      }}
      onMouseLeave={event => {
        event.currentTarget.querySelector('#cursor').style.display = 'none'
      }}
      onMouseMove={setCursorPos}
      onClick={videoAction}
    >
      <span
        id='close-video'
        onMouseEnter={event =>
          (document.querySelector('#cursor').style.display = 'none')
        }
        onMouseLeave={event =>
          (document.querySelector('#cursor').style.display = 'flex')
        }
        onClick={event => {
          event.stopPropagation()
          const v = document.querySelector('#selected-video-container')
          v.style.width = ''
          v.style.height = ''
          v.style.transform = ''

          setTimeout(() => {
            selected.state = false
            selected.src = ''
            setSelected({ ...selected })
          }, 300)
        }}
      >
        X
      </span>
      <video id='work-video' src={src} />
      <Controls />
      <div id='cursor' />
    </div>
  )
}
