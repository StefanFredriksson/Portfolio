import { waving } from '../../Shapes/Person'

export const initBackground = () => {
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  let blackhole = null

  const mouse = { x: 0, y: 0 }
  const container = document.querySelector('#main-content-container')
  const {
    offsetHeight: innerHeight,
    offsetWidth: innerWidth
  } = document.querySelector('#main-canvas-container')
  const { offsetWidth: navWidth } = document.querySelector(
    '#navigation-container'
  )

  canvas.width = innerWidth
  canvas.height = innerHeight

  function Particle (x, y, radius, color, xDist, yDist) {
    this.radius = radius
    this.x = x
    this.y = y
    this.shift = { x: 0, y: 0 }
    this.color = color
    this.motion = false
    this.xDist = xDist
    this.yDist = yDist

    this.update = (startPoint, endPoint, color) => {
      this.x = startPoint.x
      this.y = startPoint.y
      this.color = color

      this.draw(endPoint)
    }

    this.draw = endPoint => {
      c.beginPath()
      c.lineWidth = this.radius
      c.strokeStyle = this.color
      c.moveTo(this.x, this.y)
      if (!endPoint.control) c.lineTo(endPoint.x, endPoint.y)
      else {
        c.strokeStyle = 'rgba(0, 0, 0, 0)'
        c.quadraticCurveTo(
          endPoint.control.x,
          endPoint.control.y,
          endPoint.x,
          endPoint.y
        )
      }
      c.stroke()
    }
  }

  function BlackHole (length) {
    this.length = length
    this.particles = []
    this.particleCount = 0
    this.x = mouse.x
    this.y = mouse.y
    this.radius = 1
    this.void = 0
    this.expand = true

    this.init = () => {
      if (this.particles.length > 0) return
      this.particles = []
      const l = this.length / 2
      const xPos = 500
      const yPos = 500

      for (let i = 0; i < this.length; i++) {
        const tempArr = []

        for (let j = 0; j < this.length; j++) {
          const xDist = i - l
          const yDist = j - l
          const dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))

          if (dist <= l) {
            tempArr.push(
              new Particle(xPos + i, yPos + j, this.radius, 'yellow', j, i)
            )
          }
        }
        this.particles.push(tempArr)
      }
    }

    this.update = () => {
      const l = this.length / 2
      this.x = mouse.x
      this.y = mouse.y
      const imageData = c.getImageData(
        this.x - l,
        this.y - l,
        this.length,
        this.length
      )
      this.draw()

      const pixelsInside = []
      let tempPixels = []
      let prevY = 0
      const { data } = imageData

      for (let i = 0; i < data.length; i += 4) {
        const x = Math.floor((i / 4) % this.length)
        const y = Math.floor(i / 4 / this.length)
        if (y !== prevY) {
          pixelsInside.push([...tempPixels])
          prevY = y
          tempPixels = []
        }
        const xDist = x - l
        const yDist = y - l
        const distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))

        if (distance <= l) {
          tempPixels.push(getRgba(data, i))
        }
      }

      pixelsInside.push(tempPixels)

      if (this.expand) this.void += this.void >= l ? 0 : 1
      else {
        if (this.void <= 0) this.particles = []
        else this.void -= 1
      }
      const middle = this.particles.length / 2

      for (let i = 0; i < this.particles.length; i++) {
        const distance = i - middle
        const diameter =
          distance < 0
            ? this.void * 2 + distance * -1
            : this.void * 2 + distance
        const radians = Math.PI / this.particles[i].length

        for (let j = 0; j < this.particles[i].length; j++) {
          const particle = this.particles[i][j]

          const x = this.x + particle.shift.x
          const y = this.y + particle.shift.y

          const color = pixelsInside[i][j]
          let endPoint = { x: x + particle.radius, y, control: null }

          if (distance < 0) {
            particle.shift.y = (diameter / 2) * Math.sin(Math.PI + radians * j)
            particle.shift.x = (diameter / 2) * Math.cos(Math.PI + radians * j)
            endPoint.x =
              this.x + (diameter / 2) * Math.cos(Math.PI + radians * (j + 1))
            endPoint.y =
              this.y + (diameter / 2) * Math.sin(Math.PI + radians * (j + 1))
          } else if (distance >= 0) {
            const increment = this.particles[i].length - 1 - j
            particle.shift.y = (diameter / 2) * Math.sin(radians * increment)
            particle.shift.x = (diameter / 2) * Math.cos(radians * increment)
            endPoint.x =
              this.x + (diameter / 2) * Math.cos(radians * (increment + 1))
            endPoint.y =
              this.y + (diameter / 2) * Math.sin(radians * (increment + 1))
          }

          if (this.particles[i].length === 1) {
            const cx = endPoint.x - (endPoint.x - x) / 2
            const cy = endPoint.y - diameter
            endPoint.control = { x: cx, y: cy }
          }

          particle.update({ x, y }, endPoint, color)
        }
      }
    }

    this.draw = () => {
      c.beginPath()
      c.arc(this.x, this.y, this.void, 0, 2 * Math.PI, false)
      c.fillStyle = '#1d1d1d'
      c.fill()
      c.closePath()
    }
  }

  function Person (data, x, y) {
    this.data = data
    this.x = x
    this.y = y

    this.update = () => {
      const keys = Object.keys(this.data)

      for (const key of keys) {
        this.draw(this.data[key].path, this.data[key].color)
      }
    }

    this.draw = (path, color) => {
      c.save()
      c.setTransform(1, 0, 0, 1, this.x, this.y)
      c.beginPath()
      c.fillStyle = color
      c.fill(path)
      c.restore()
    }
  }

  const getRgba = (data, index) => {
    return `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${
      data[index + 3]
    })`
  }

  let person = null
  let mainGradient = null
  let containers = []

  const init = event => {
    container.addEventListener('mousemove', mousemove)
    container.addEventListener('mousedown', mousedown)
    container.addEventListener('mouseup', mouseup)
    containers = [
      { element: document.querySelector('#homepage-container'), active: true },
      { element: document.querySelector('#about-container'), active: false },
      {
        element: document.querySelector('#main-skills-container'),
        active: false
      }
    ]

    for (let i = 0; i < containers.length; i++) {
      const c = containers[i]
      c.element.style.transition = '1s'
    }

    mainGradient = c.createLinearGradient(0, 0, 0, 500)
    mainGradient.addColorStop(0, 'rgb(114, 123, 199)')
    mainGradient.addColorStop(1, 'rgb(88, 94, 151)')
    person = new Person(waving, 500, 100)

    animate()
  }

  const mousemove = event => {
    mouse.x = event.clientX - navWidth
    mouse.y = event.clientY
  }

  const mousedown = event => {
    mousemove(event)
    if (!blackhole) blackhole = new BlackHole(100)
    blackhole.expand = true
    blackhole.init()
  }

  const mouseup = event => {
    blackhole.expand = false
  }

  const animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)

    person.update()

    if (blackhole) blackhole.update()

    window.requestAnimationFrame(animate)
  }

  init()
}
