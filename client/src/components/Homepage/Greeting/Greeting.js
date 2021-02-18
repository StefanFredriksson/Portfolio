import React, { useEffect } from 'react'

export default function Greeting () {
  useEffect(async () => {
    const spans = document.querySelectorAll('.bounce')
    for (const span of spans) {
      span.addEventListener('animationend', e => {
        span.classList.remove('animated')
        span.classList.remove('fade-in-anim')
        span.style.opacity = '1'
      })
    }

    await textEntrance()

    for (const span of spans) {
      span.addEventListener('mouseover', e => {
        span.classList.add('animated')
      })
      span.style.transition = '0s'
    }
  }, [])

  const textEntrance = () => {
    return new Promise((resolve, reject) => {
      const first = document.querySelector('#first-row')
      const second = document.querySelector('#second-row')
      const third = document.querySelector('#third-row')
      const fourth = document.querySelector('#fourth-row')

      setTimeout(async () => {
        await fadeInRow(first)
        setTimeout(async () => {
          await fadeInRow(second)
          setTimeout(async () => {
            await fadeInRow(third)
            setTimeout(() => {
              fourth.addEventListener('animationend', e => {
                fourth.classList.remove('fade-in-anim')
                fourth.style.opacity = '1'
              })
              fourth.classList.add('fade-in-anim')
              resolve()
            }, 1000)
          }, 1000)
        }, 1000)
      }, 500)
    })
  }

  const fadeInRow = row => {
    return new Promise(async (resolve, reject) => {
      const spans = row.querySelectorAll('span')

      for (const span of spans) await fadeInSpan(span)

      resolve(0)
    })
  }

  const fadeInSpan = span => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        span.classList.add('fade-in-anim')
        resolve(0)
      }, 100)
    })
  }

  return (
    <div id='welcome-container'>
      <h1>
        <div id='first-row'>
          <span className='bounce'>H</span>
          <span className='bounce'>e</span>
          <span className='bounce'>l</span>
          <span className='bounce'>l</span>
          <span className='bounce'>o</span>
          <span className='bounce'>,</span>
        </div>
        <div id='second-row'>
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
        <div id='third-row'>
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
      </h1>
      <div id='fourth-row'>
        <h2>Web developer</h2>
      </div>
    </div>
  )
}
