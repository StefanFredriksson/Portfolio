import React, { useEffect } from 'react'
import './Homepage.css'

export default function Homepage () {
  const nrOrbs = []
  const orbCnt = 20
  const force = 3
  const mouseDown = {
    state: false,
    pos: { x: 0, y: 0 }
  }

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

    document
      .querySelector('#homepage-container')
      .addEventListener('mousedown', handleMouseDown)
    document
      .querySelector('#homepage-container')
      .addEventListener('mouseup', handleMouseUp)
    document
      .querySelector('#homepage-container')
      .addEventListener('mousemove', handleMouseMove)

    await textEntrance()

    for (const span of spans) {
      span.addEventListener('mouseover', e => {
        span.classList.add('animated')
      })
      span.style.transition = '0s'
    }
  }, [])

  const handleMouseDown = event => {
    if (event.button !== 0) return
    const nav = document.querySelector('#navigation-container')
    mouseDown.state = true
    mouseDown.pos.x = event.clientX - nav.offsetWidth
    mouseDown.pos.y = event.clientY
  }

  const handleMouseUp = event => {
    if (event.button !== 0) return
    mouseDown.state = false
    const nav = document.querySelector('#navigation-container')
    const home = document.querySelector('#homepage-container')

    for (const orb of orbs) {
      if (orb.rotating) {
        const pos = orb.element.getBoundingClientRect()
        orb.element.style.left = pos.x - nav.offsetWidth + 'px'
        orb.element.style.top = pos.y + 'px'
        orb.element.style.transition = ''
        orb.element.style.transform = ''
        setDirection(orb)
        console.log(orb.x.direction, orb.y.direction)
      } else if (atMouse(orb) || orb.movingToMouse) {
        setDirection(orb)
      }

      clearTimeout(orb.timeout)
      orb.rotating = false
      orb.movingToMouse = false
      orb.element.classList.remove('position-orb')
    }
    home.classList.remove('rotate')
  }

  const handleMouseMove = event => {
    const home = document.querySelector('#homepage-container')
    if (!mouseDown.state) return

    const nav = document.querySelector('#navigation-container')
    mouseDown.pos.x = event.clientX - nav.offsetWidth
    mouseDown.pos.y = event.clientY
    for (const orb of orbs) {
      if (orb.rotating) {
        orb.element.style.left = mouseDown.pos.x + 'px'
        orb.element.style.top = mouseDown.pos.y + 'px'
      } else if (orb.positioning) {
        const pos = orb.element.getBoundingClientRect()
        orb.element.style.left = pos.x - nav.offsetWidth + 'px'
        orb.element.style.top = pos.y + 'px'
        orb.element.style.transform = ''
        orb.element.classList.remove('position-orb')
        clearTimeout(orb.timeout)
        orb.positioning = false
      }
    }
  }

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
    let x = Math.floor(
      Math.random() * home.offsetWidth - orb.element.offsetWidth
    )
    let y = Math.floor(
      Math.random() * home.offsetHeight - orb.element.offsetHeight
    )

    if (x <= 0) x += orb.element.offsetWidth + 1
    if (y <= 0) y += orb.element.offsetHeight + 1

    orb.element.style.left = x + 'px'
    orb.element.style.top = y + 'px'
  }

  const moveOrbs = () => {
    const o = document.querySelectorAll('.orb')

    for (const orb of o) {
      const tempOrb = {
        element: orb,
        x: {
          direction: 0
        },
        y: { direction: 0 },
        rotating: false,
        movingToMouse: false,
        positioning: false
      }

      setOrbStartPos(tempOrb)
      setOrbColor(orb)
      setDirection(tempOrb)
      orbs.push(tempOrb)
    }

    window.requestAnimationFrame(moveOrbsPos)
  }

  const moveOrbsPos = () => {
    if (mouseDown.state) {
      for (const orb of orbs) {
        if (orb.rotating || orb.positioning) continue

        if (allAtMouse()) {
          circleMouse()
          break
        } else {
          moveToMouse(orb)
          orbFloat(orb)
        }
      }
    } else {
      for (const orb of orbs) {
        orbFloat(orb)
      }
    }

    window.requestAnimationFrame(moveOrbsPos)
  }

  const allAtMouse = () => {
    for (const orb of orbs) {
      if (!atMouse(orb)) return false
      else if (orb.movingToMouse) orb.movingToMouse = false
    }

    return true
  }

  const atMouse = orb => {
    const nav = document.querySelector('#navigation-container')
    const pos = orb.element.getBoundingClientRect()
    const x = pos.x - nav.offsetWidth
    const xDiff =
      x > mouseDown.pos.x ? x - mouseDown.pos.x : mouseDown.pos.x - x
    const yDiff =
      pos.y > mouseDown.pos.y
        ? pos.y - mouseDown.pos.y
        : mouseDown.pos.y - pos.y

    if (xDiff < force && yDiff < force) {
      orb.element.style.left = mouseDown.pos.x + 'px'
      orb.element.style.top = mouseDown.pos.y + 'px'
      orb.x.direction = 0
      orb.y.direction = 0
      return true
    }

    return (
      pos.x - nav.offsetWidth === mouseDown.pos.x && pos.y === mouseDown.pos.y
    )
  }

  const position = async () => {
    return new Promise((resolve, reject) => {
      const angle = 360 / orbs.length

      for (let i = 0; i < orbs.length; i++) {
        orbs[i].element.classList.add('position-orb')
        const x = mouseDown.pos.x + 50 * Math.cos(angle * i)
        const y = mouseDown.pos.y + 50 * Math.sin(angle * i)
        orbs[i].element.style.transform = `translate(${mouseDown.pos.x -
          x}px, ${mouseDown.pos.y - y}px)`
        orbs[i].positioning = true

        orbs[i].timeout = setTimeout(() => {
          orbs[i].positioning = false
          orbs[i].rotating = true
          orbs[i].element.classList.remove('position-orb')
          orbs[i].element.style.animationDelay = `${(i - orbs.length - 1) *
            0.1}s`

          if (i === orbs.length - 1) resolve(0)
        }, 500)
      }
    })
  }

  const circleMouse = async orb => {
    const home = document.querySelector('#homepage-container')
    await position()
    home.classList.add('rotate')
  }

  const moveToMouse = orb => {
    const nav = document.querySelector('#navigation-container')
    const pos = orb.element.getBoundingClientRect()
    const x = pos.x - nav.offsetWidth
    const y = pos.y

    const xDiff =
      x > mouseDown.pos.x ? x - mouseDown.pos.x : mouseDown.pos.x - x
    const yDiff =
      y > mouseDown.pos.y ? y - mouseDown.pos.y : mouseDown.pos.y - y

    if (xDiff > yDiff) {
      orb.x.direction = x > mouseDown.pos.x ? -1 : 1
      orb.y.direction = yDiff / xDiff
      if (y > mouseDown.pos.y) orb.y.direction *= -1
    } else if (yDiff > xDiff) {
      orb.y.direction = y > mouseDown.pos.y ? -1 : 1
      orb.x.direction = xDiff / yDiff
      if (x > mouseDown.pos.x) orb.x.direction *= -1
    }
    orb.x.direction *= force
    orb.y.direction *= force
    orb.movingToMouse = true
  }

  const orbFloat = orb => {
    const home = document.querySelector('#homepage-container')
    const nav = document.querySelector('#navigation-container')

    if (!home) return

    const pos = orb.element.getBoundingClientRect()
    orb.element.style.left = pos.x + orb.x.direction - nav.offsetWidth + 'px'
    orb.element.style.top = pos.y + orb.y.direction + 'px'

    const currentPos = orb.element.getBoundingClientRect()

    if (currentPos.x - nav.offsetWidth <= 0 && orb.x.direction < 0) {
      orb.x.direction *= -1
    }

    if (
      currentPos.x - nav.offsetWidth + orb.element.offsetWidth >=
        home.offsetWidth &&
      orb.x.direction > 0
    ) {
      orb.x.direction *= -1
    }

    if (currentPos.y <= 0 && orb.y.direction < 0) {
      orb.y.direction *= -1
    }

    if (
      currentPos.y + orb.element.offsetHeight >= home.offsetHeight &&
      orb.y.direction > 0
    ) {
      orb.y.direction *= -1
    }
  }

  const setDirection = orb => {
    const xDir = Math.round(Math.random()) === 0 ? -1 : 1
    const yDir = Math.round(Math.random()) === 0 ? -1 : 1

    orb.y.direction = Math.random() * yDir
    orb.x.direction = Math.random() * xDir
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
