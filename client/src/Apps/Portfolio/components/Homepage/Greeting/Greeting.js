import React, { useEffect } from 'react'
import './Greeting.css'

export default function Greeting () {
  useEffect(async () => {
    setColor()
    await wait(600)
    beginAnimation()
  }, [])

  const wait = (duration = 1000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, duration)
    })
  }

  const setColor = () => {
    const spans = document.querySelectorAll('.bounce')

    for (const span of spans) {
      span.style.color = 'var(--main-color)'
    }
  }

  const beginAnimation = async () => {
    const spans = document.querySelectorAll('.bounce')
    for (const span of spans) {
      span.addEventListener('animationend', e => {
        span.classList.remove('animated')
      })
    }

    await textEntrance()

    for (const span of spans) {
      span.addEventListener('mouseover', e => {
        span.classList.add('animated')
      })
      span.style.transition = '0.2s'
    }
  }

  const textEntrance = () => {
    return new Promise(async (resolve, reject) => {
      const first = document.querySelector('#first-row')
      const second = document.querySelector('#second-row')
      const third = document.querySelector('#third-row')

      await rowEntrance(first)
      await rowEntrance(second)
      await rowEntrance(third)
      resolve(0)
    })
  }

  const rowEntrance = row => {
    return new Promise(async (resolve, reject) => {
      const spans = row.querySelectorAll('span')

      for (const span of spans) {
        await spanEntrance(span)
      }

      resolve(0)
    })
  }

  const spanEntrance = span => {
    return new Promise((resolve, reject) => {
      span.style.color = ''
      setTimeout(() => {
        span.classList.add('animated')
        resolve(0)
      }, 50)
    })
  }

  return (
    <div id='welcome-container'>
      <div id='main-text'>
        <div id='first-row' className='animated-row'>
          <span className='bounce'>H</span>
          <span className='bounce'>e</span>
          <span className='bounce'>l</span>
          <span className='bounce'>l</span>
          <span className='bounce'>o</span>
          <span className='bounce'>,</span>
        </div>
        <div id='second-row' className='animated-row'>
          <span className='bounce'>I</span>
          <span className='bounce'>'</span>
          <span className='bounce'>m</span>
          &nbsp;
          <span className='bounce'>S</span>
          <span className='bounce'>t</span>
          <span className='bounce'>e</span>
          <span className='bounce'>f</span>
          <span className='bounce'>a</span>
          <span className='bounce'>n</span>
          <span className='bounce'>.</span>
        </div>
        <div id='third-row' className='animated-row'>
          <span className='bounce'>W</span>
          <span className='bounce'>e</span>
          <span className='bounce'>l</span>
          <span className='bounce'>c</span>
          <span className='bounce'>o</span>
          <span className='bounce'>m</span>
          <span className='bounce'>e</span>
          &nbsp;
          <span className='bounce'>t</span>
          <span className='bounce'>o</span>
          &nbsp;
          <span className='bounce'>m</span>
          <span className='bounce'>y</span>
          &nbsp;
          <span className='bounce'>p</span>
          <span className='bounce'>o</span>
          <span className='bounce'>r</span>
          <span className='bounce'>t</span>
          <span className='bounce'>f</span>
          <span className='bounce'>o</span>
          <span className='bounce'>l</span>
          <span className='bounce'>i</span>
          <span className='bounce'>o</span>
          <span className='bounce'>.</span>
        </div>
      </div>
      <div id='fourth-row'>
        <h2>Web developer</h2>
      </div>
    </div>
  )
}
