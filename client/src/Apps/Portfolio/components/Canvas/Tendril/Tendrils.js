import React, { useEffect } from 'react'
import { Tendril, settings } from './TendrilLogic'

export default function Tendrils ({ color, navSwap }) {
  let tendrils = []
  let canvas = null
  let c = null
  const mouse = { x: 0, y: 0 }
  let navOffsetWidth = 0
  let navWidth = 0

  useEffect(() => {
    canvas = document.querySelector('canvas')
    c = canvas.getContext('2d')
    c.running = true
    const {
      offsetHeight: innerHeight,
      offsetWidth: innerWidth
    } = document.querySelector('#main-canvas-container')
    navOffsetWidth = document.querySelector('#navigation-container').offsetWidth

    let navWidth = navOffsetWidth

    canvas.width = innerWidth
    canvas.height = innerHeight

    window.addEventListener('mousemove', init)
    window.addEventListener('touchstart', init)
    window.addEventListener('resize', resize)
    window.addEventListener('focus', start)
    window.addEventListener('blur', stop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('focus', start)
      window.removeEventListener('blur', stop)
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('touchmove', mousemove)
      window.removeEventListener('touchstart', touchstart)
    }
  }, [])

  const start = () => {
    if (!c.running) {
      c.running = true
      loop()
    }
  }

  const stop = () => {
    c.running = false
  }

  const init = event => {
    window.removeEventListener('mousemove', init)
    window.removeEventListener('touchstart', init)

    window.addEventListener('mousemove', mousemove)
    window.addEventListener('touchmove', mousemove)
    window.addEventListener('touchstart', touchstart)

    mousemove(event)
    resize(event)
    reset()
    loop()
  }

  const touchstart = event => {
    if (event.touches.length === 1) {
      mouse.x = event.touches[0].pageX - navWidth
      mouse.y = event.touches[0].pageY
    }
  }

  const mousemove = event => {
    if (event.touches) {
      mouse.x = event.touches[0].pageX - navWidth
      mouse.y = event.touches[0].pageY
    } else {
      mouse.x = event.clientX - navWidth
      mouse.y = event.clientY
    }
    event.preventDefault()
  }

  const resize = event => {
    if (window.innerWidth <= navSwap) {
      navWidth = 0
    } else {
      navWidth = navOffsetWidth
    }
    const container = document.querySelector('#main-canvas-container')
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
  }

  const reset = () => {
    tendrils = []

    for (let i = 0; i < settings.trails; i++) {
      tendrils.push(
        new Tendril({ spring: 0.45 + 0.025 * (i / settings.trails) }, mouse, c)
      )
    }
  }

  const loop = () => {
    if (!c.running) return
    c.globalCompositeOperation = 'source-over'
    c.globalCompositeOperation = 'lighter'
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.lineWidth = 1
    c.strokeStyle = color

    for (const tendril of tendrils) {
      tendril.update()
      tendril.draw()
    }

    window.requestAnimationFrame(loop)
  }

  return (
    <>
      <canvas />
    </>
  )
}
