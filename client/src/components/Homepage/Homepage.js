import React, { useEffect } from 'react'
import './Homepage.css'

export default function Homepage () {
  const nrOrbs = []
  const orbCnt = 20

  for (let i = 0; i < orbCnt; i++) nrOrbs.push(0)

  useEffect(async () => {
    const spans = document.querySelectorAll('.bounce')
    for (const span of spans) {
      span.addEventListener('animationend', e => {
        span.classList.remove('animated')
        span.classList.remove('fade-in-anim')
        span.style.opacity = '1'
      })
    }

    moveOrbs()
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

  const orbs = []

  const setOrbColor = orb => {
    const r = Math.round(Math.random() * 255)
    const g = Math.round(Math.random() * 255)
    const b = Math.round(Math.random() * 255)
    const rgb = `rgb(${r}, ${g}, ${b})`

    orb.style.background = rgb
    orb.style.boxShadow = `0 0 5px ${rgb}, 0 0 10px ${rgb}, 0 0 15px ${rgb}, 0 0 25px ${rgb},
    0 0 40px ${rgb}`
  }

  const setOrbStartPos = orb => {
    const home = document.querySelector('#homepage-container')
    let x = Math.floor(Math.random() * home.offsetWidth - orb.offsetWidth)
    let y = Math.floor(Math.random() * home.offsetHeight - orb.offsetHeight)

    if (x <= 0) x += orb.offsetWidth + 1
    if (y <= 0) y += orb.offsetHeight + 1

    orb.style.left = x + 'px'
    orb.style.top = y + 'px'
  }

  const moveOrbs = () => {
    const o = document.querySelectorAll('.orb')

    for (const orb of o) {
      setOrbStartPos(orb)
      setOrbColor(orb)

      const tempOrb = {
        element: orb,
        x: {
          direction: 0,
          target: 0,
          count: 0
        },
        y: { direction: 0, target: 0, count: 0 }
      }

      setDirection(tempOrb)
      orbs.push(tempOrb)
    }

    window.requestAnimationFrame(moveOrbsPos)
  }

  const moveOrbsPos = () => {
    const nav = document.querySelector('#navigation-container')
    const home = document.querySelector('#homepage-container')

    if (!home) return

    for (const orb of orbs) {
      const pos = orb.element.getBoundingClientRect()

      if (orb.x.target === 0 || orb.x.count === orb.x.target) {
        orb.x.count = 0

        orb.element.style.left =
          pos.x + orb.x.direction - nav.offsetWidth + 'px'
      }

      if (orb.y.target === 0 || orb.y.count === orb.y.target) {
        orb.y.count = 0

        orb.element.style.top = pos.y + orb.y.direction + 'px'
      }

      orb.x.count++
      orb.y.count++

      const currentPos = orb.element.getBoundingClientRect()

      if (currentPos.x - nav.offsetWidth <= 0) {
        orb.x.direction = 1
      }

      if (
        currentPos.x - nav.offsetWidth + orb.element.offsetWidth >=
        home.offsetWidth
      ) {
        orb.x.direction = -1
      }

      if (currentPos.y <= 0) {
        orb.y.direction = 1
      }

      if (currentPos.y + orb.element.offsetHeight >= home.offsetHeight) {
        orb.y.direction = -1
      }
    }

    window.requestAnimationFrame(moveOrbsPos)
  }

  const setDirection = orb => {
    const which = Math.round(Math.random())

    if (which === 0) {
      orb.x.target = 0
      orb.y.target = Math.round(Math.random() * 10)
    } else {
      orb.x.target = Math.round(Math.random() * 10)
      orb.y.target = 0
    }

    orb.y.direction = Math.round(Math.random()) === 0 ? -1 : 1
    orb.x.direction = Math.round(Math.random()) === 0 ? -1 : 1
  }

  return (
    <div id='homepage-container'>
      {nrOrbs.map(s => {
        return <span className='orb' />
      })}

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
    </div>
  )
}
