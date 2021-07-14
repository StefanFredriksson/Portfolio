import React, { useEffect, useState } from 'react'
import './Timer.css'
import Dropdown from './Dropdown/Dropdown'
import useSound from 'use-sound'
import watchBeep from '../Sound/watch_beep.mp3'
import watchBeepLow from '../Sound/watch_beep_low.mp3'

let count = false
const delays = [0, 5, 10, 15]
const delayIdentifier = 'selected-delay'
const defaults = [15, 30, 45, 60]
const defaultIdentifier = 'selected-default'
let defaultTime = defaults[0]

export default function Timer () {
  const [time, setTime] = useState(defaultTime)
  const [counting, setCounting] = useState(false)
  const [playBeep] = useSound(watchBeep)
  const [playBeepLow] = useSound(watchBeepLow)

  useEffect(async () => {
    if (time === defaultTime) return
    if (time <= 0) {
      toggleInput(false)
      toggleCount(false)
      setTime(defaultTime)
      setValues(true)
      playBeep()
      return
    }

    setValues()

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

  const setValues = (empty = false) => {
    document.querySelector('#minutes').value = !empty ? getMinutes() : ''
    document.querySelector('#seconds').value = !empty ? getSeconds() : ''
  }

  const getMinutes = () => {
    const mins = Math.floor((time / 60) % 60)
    return `${mins < 10 ? (mins < 0 ? '00' : '0' + mins) : mins}`
  }

  const getSeconds = () => {
    const secs = Math.floor(time % 60)
    return `${secs < 10 ? (secs < 0 ? '00' : '0' + secs) : secs}`
  }

  const toggleInput = disable => {
    document.querySelector('#minutes').disabled = disable
    document.querySelector('#seconds').disabled = disable
  }

  const toggleCount = state => {
    count = state
    setCounting(state)
  }

  const waitForTimeout = duration => {
    return new Promise(async (resolve, reject) => {
      let count = 0

      while (count < duration) {
        await wait()
        count++

        if (duration - count === 0) playBeep()
        else playBeepLow()
      }

      resolve(true)
    })
  }

  const startTimer = async event => {
    toggleInput(true)
    toggleCount(true)

    const waitContainer = document.querySelector(`.${delayIdentifier}`)
    const waitTime = parseInt(
      waitContainer.querySelector('.selected-value').textContent
    )

    if (waitTime > 0) await waitForTimeout(waitTime)

    const minutes = document.querySelector('#minutes')
    const seconds = document.querySelector('#seconds')
    const minVal = minutes.value
    const secVal = seconds.value
    let sum = 0

    if (minVal.length === 0 && secVal.length === 0) {
      sum = defaultTime
    } else {
      for (let i = 0; i < minVal.length; i++) {
        sum +=
          i === 0 && minVal.length === 2
            ? parseInt(minVal[i] * 10 * 60)
            : parseInt(minVal[i] * 60)
      }

      for (let i = 0; i < secVal.length; i++) {
        sum +=
          i === 0 && secVal.length === 2
            ? parseInt(secVal[i] * 10)
            : parseInt(secVal[i])
      }
    }

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
    setTime(defaultTime)
    setValues(true)
  }

  const setDefaultTime = event => {
    const newDefault = parseInt(event.target.textContent)
    defaultTime = newDefault
    setTime(newDefault)
  }

  return (
    <div id='timer-container'>
      <div id='default-container'>
        <label>Default time</label>
        <Dropdown
          options={defaults}
          identifier={defaultIdentifier}
          optionalFunction={setDefaultTime}
        />
      </div>
      <div id='timer'>
        <input
          id='minutes'
          type='text'
          placeholder={getMinutes()}
          maxLength='2'
        />
        <span id='colon'>:</span>
        <input
          id='seconds'
          type='text'
          placeholder={getSeconds()}
          maxLength='2'
        />
      </div>
      <div id='controls'>
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
      </div>
      <div id='wait-container'>
        <label>Start delay</label>
        <Dropdown options={delays} identifier={delayIdentifier} />
      </div>
    </div>
  )
}
