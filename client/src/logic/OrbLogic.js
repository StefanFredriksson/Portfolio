export const mouseDown = (mouse, event) => {
  if (event.button !== 0) return
  const nav = document.querySelector('#navigation-container')
  mouse.state = true
  mouse.pos.x = event.clientX - nav.offsetWidth
  mouse.pos.y = event.clientY
}

export const mouseUp = (mouse, orbs, force, event) => {
  if (event.button !== 0) return
  mouse.state = false
  const nav = document.querySelector('#navigation-container')
  const home = document.querySelector('#homepage-container')

  for (const orb of orbs) {
    if (orb.rotating || orb.positioning) {
      const pos = orb.element.getBoundingClientRect()
      orb.element.style.left = pos.x - nav.offsetWidth + 'px'
      orb.element.style.top = pos.y + 'px'
      orb.element.style.transition = ''
      orb.element.style.transform = ''
      setDirection(orb)
    } else if (atMouse(orb, mouse, force) || orb.movingToMouse) {
      setDirection(orb)
    }

    clearTimeout(orb.timeout)
    orb.rotating = false
    orb.positioning = false
    orb.movingToMouse = false
    orb.element.classList.remove('position-orb')
  }
  home.classList.remove('rotate')
}

export const mouseMove = (mouse, orbs, event) => {
  if (!mouse.state) return

  const nav = document.querySelector('#navigation-container')
  mouse.pos.x = event.clientX - nav.offsetWidth
  mouse.pos.y = event.clientY
  for (const orb of orbs) {
    if (orb.rotating) {
      orb.element.style.left = mouse.pos.x + 'px'
      orb.element.style.top = mouse.pos.y + 'px'
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
  let x = Math.floor(Math.random() * home.offsetWidth - orb.element.offsetWidth)
  let y = Math.floor(
    Math.random() * home.offsetHeight - orb.element.offsetHeight
  )

  if (x <= 0) x += orb.element.offsetWidth + 1
  if (y <= 0) y += orb.element.offsetHeight + 1

  orb.element.style.left = x + 'px'
  orb.element.style.top = y + 'px'
}

export const initOrbs = (orbs, mouse, force) => {
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

  window.requestAnimationFrame(() => {
    moveOrbsPos(mouse, orbs, force)
  })
}

const moveOrbsPos = (mouse, orbs, force) => {
  if (mouse.state) {
    for (const orb of orbs) {
      if (orb.rotating || orb.positioning) continue

      if (allAtMouse(orbs, mouse, force)) {
        circleMouse(orbs, mouse)
        break
      } else {
        moveToMouse(orb, mouse, force)
        orbFloat(orb)
      }
    }
  } else {
    for (const orb of orbs) {
      orbFloat(orb)
    }
  }

  window.requestAnimationFrame(() => {
    moveOrbsPos(mouse, orbs, force)
  })
}

const allAtMouse = (orbs, mouse, force) => {
  for (const orb of orbs) {
    if (!atMouse(orb, mouse, force)) return false
    else if (orb.movingToMouse) orb.movingToMouse = false
  }

  return true
}

const atMouse = (orb, mouse, force) => {
  const nav = document.querySelector('#navigation-container')
  const pos = orb.element.getBoundingClientRect()
  const x = pos.x - nav.offsetWidth
  const xDiff = x > mouse.pos.x ? x - mouse.pos.x : mouse.pos.x - x
  const yDiff = pos.y > mouse.pos.y ? pos.y - mouse.pos.y : mouse.pos.y - pos.y

  if (xDiff < force && yDiff < force) {
    orb.element.style.left = mouse.pos.x + 'px'
    orb.element.style.top = mouse.pos.y + 'px'
    orb.x.direction = 0
    orb.y.direction = 0
    return true
  }

  return pos.x - nav.offsetWidth === mouse.pos.x && pos.y === mouse.pos.y
}

const position = async (orbs, mouse) => {
  return new Promise((resolve, reject) => {
    const angle = 360 / orbs.length

    for (let i = 0; i < orbs.length; i++) {
      orbs[i].element.classList.add('position-orb')
      const x = mouse.pos.x + 50 * Math.cos(angle * i)
      const y = mouse.pos.y + 50 * Math.sin(angle * i)
      orbs[i].element.style.transform = `translate(${mouse.pos.x - x}px, ${mouse
        .pos.y - y}px)`
      orbs[i].positioning = true

      orbs[i].timeout = setTimeout(() => {
        orbs[i].positioning = false
        orbs[i].rotating = true
        orbs[i].element.classList.remove('position-orb')
        orbs[i].element.style.animationDelay = `${(i - orbs.length - 1) * 0.1}s`

        if (i === orbs.length - 1) resolve(0)
      }, 500)
    }
  })
}

const circleMouse = async (orbs, mouse) => {
  await position(orbs, mouse)
  const home = document.querySelector('#homepage-container')
  home.classList.add('rotate')
}

const moveToMouse = (orb, mouse, force) => {
  const nav = document.querySelector('#navigation-container')
  const pos = orb.element.getBoundingClientRect()
  const x = pos.x - nav.offsetWidth
  const y = pos.y

  const xDiff = x > mouse.pos.x ? x - mouse.pos.x : mouse.pos.x - x
  const yDiff = y > mouse.pos.y ? y - mouse.pos.y : mouse.pos.y - y

  if (xDiff > yDiff) {
    orb.x.direction = x > mouse.pos.x ? -1 : 1
    orb.y.direction = yDiff / xDiff
    if (y > mouse.pos.y) orb.y.direction *= -1
  } else if (yDiff > xDiff) {
    orb.y.direction = y > mouse.pos.y ? -1 : 1
    orb.x.direction = xDiff / yDiff
    if (x > mouse.pos.x) orb.x.direction *= -1
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
