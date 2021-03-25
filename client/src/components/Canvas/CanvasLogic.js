let c = null
let mouse = null
let canvas = null
const colors = [
  'rgba(0, 189, 255, 1)',
  'rgba(77, 57, 206, 1)',
  'rgba(8, 142, 255, 1)'
]

let oldParticles = []

function Particle (x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.radians = Math.random() * Math.PI * 2
  this.velocity = 0.05
  this.distanceFromCenter = randomIntFromRange(50, 120)
  this.lastMouse = { x, y }

  this.update = () => {
    const lastPoint = { x: this.x, y: this.y }
    this.radians += this.velocity

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.velocity
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.velocity
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter
    oldParticles.push(
      new OldParticle(
        this.x,
        this.y,
        this.radius,
        this.color,
        new Date().getTime(),
        lastPoint
      )
    )
    this.draw(lastPoint)
  }

  this.draw = lastPoint => {
    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x, lastPoint.y)
    c.lineTo(this.x, this.y)
    c.stroke()
    c.closePath()
  }
}

function OldParticle (x, y, radius, color, time, lastPoint) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.time = time
  this.lastMouse = { x, y }
  this.lastPoint = lastPoint

  this.update = () => {
    this.draw()
  }

  this.draw = () => {
    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x, lastPoint.y)
    c.lineTo(this.x, this.y)
    c.stroke()
    c.closePath()
  }

  this.setColor = color => {
    this.color = color
  }
}

const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomColor = colors => {
  return colors[Math.floor(Math.random() * colors.length)]
}

let particles = []

export const init = () => {
  particles = []
  canvas = document.querySelector('canvas')
  const {
    offsetHeight: innerHeight,
    offsetWidth: innerWidth
  } = document.querySelector('#main-canvas-container')
  const { offsetWidth: navWidth } = document.querySelector(
    '#navigation-container'
  )
  c = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  mouse = { x: innerWidth / 2, y: innerHeight / 2 }

  window.addEventListener('mousemove', event => {
    mouse.x = event.clientX - navWidth
    mouse.y = event.clientY
  })

  window.addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
  })

  for (let i = 0; i < 50; i++) {
    const radius = randomIntFromRange(1, 2)
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        randomColor(colors)
      )
    )
  }
  animate()
}

const maxDuration = 800

const animate = () => {
  window.requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  const time = new Date().getTime()

  for (let i = oldParticles.length - 1; i >= 0; i--) {
    const particle = oldParticles[i]
    const duration = time - particle.time
    if (duration >= maxDuration) {
      oldParticles.splice(i, 1)
      continue
    }

    const end = particle.color.lastIndexOf(',')
    const temp = particle.color.slice(0, end + 1)
    const alpha = (maxDuration - duration) / 1000
    particle.setColor(`${temp} ${alpha})`)
    particle.update()
  }

  for (const particle of particles) {
    particle.update()
  }
}
