import React, { useEffect, useState } from 'react'
import './Timer.css'

let count = false

export default function Timer ({ defaultTime }) {
  const [time, setTime] = useState(defaultTime)
  const [counting, setCounting] = useState(false)

  useEffect(async () => {
    if (time < 0) {
      toggleInput(false)
      setCounting(false)
      setTime(defaultTime)
      return
    }

    const mins = getMinutes()
    const secs = getSeconds()

    const minutes = document.querySelector('#minutes')
    const seconds = document.querySelector('#seconds')

    minutes.value = `${mins < 10 ? (mins < 0 ? '00' : '0' + mins) : mins}`
    seconds.value = `${secs < 10 ? (secs < 0 ? '00' : '0' + secs) : secs}`

    await wait()
    if (count) setTime(time - 1)
  }, [time])

  const wait = (duration = 1000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, duration)
    })
  }

  const getMinutes = () => {
    return Math.floor((time / 60) % 60)
  }

  const getSeconds = () => {
    return Math.floor(time % 60)
  }

  const toggleInput = disable => {
    const minutes = document.querySelector('#minutes')
    const seconds = document.querySelector('#seconds')
    minutes.disabled = disable
    seconds.disabled = disable
  }

  const toggleCount = state => {
    count = state
    setCounting(state)
  }

  const startTimer = async event => {
    const minutes = document.querySelector('#minutes')
    const seconds = document.querySelector('#seconds')
    toggleInput(true)
    const minVal = minutes.value
    const secVal = seconds.value
    let sum = 0

    sum += minVal[0] === '0' ? parseInt(minVal[1]) * 60 : parseInt(minVal) * 60
    sum += secVal[0] === '0' ? parseInt(secVal[1]) : parseInt(secVal)
    toggleCount(true)

    await wait()
    if (count) setTime(sum - 1)
  }

  const pauseTimer = event => {
    toggleCount(false)
    toggleInput(false)
  }

  const stopTimer = event => {
    toggleInput(false)
    toggleCount(false)
    setTime(-1)
  }

  return (
    <div id='timer-container'>
      <div id='timer'>
        <input id='minutes' type='text' maxLength='2' />
        <span id='colon'>:</span>
        <input id='seconds' type='text' maxLength='2' />
      </div>
      <span id='controls'>
        {counting ? (
          <div id='pause-stop'>
            <i
              className='fa fa-pause'
              aria-hidden='true'
              onClick={pauseTimer}
            />
            <i class='fa fa-stop' aria-hidden='true' onClick={stopTimer} />
          </div>
        ) : (
          <i className='fa fa-play' aria-hidden='true' onClick={startTimer} />
        )}
      </span>
    </div>
  )
}
