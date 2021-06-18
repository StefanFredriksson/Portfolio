let canvas = null
let c = null
let mouse = null
let points = []

export const init = () => {
  canvas = document.querySelector('canvas')
  c = canvas.getContext('2d')
  mouse = { x: 0, y: 0 }
  const {
    offsetHeight: innerHeight,
    offsetWidth: innerWidth
  } = document.querySelector('#main-canvas-container')
  const { offsetWidth: navWidth } = document.querySelector(
    '#navigation-container'
  )

  canvas.width = innerWidth
  canvas.height = innerHeight

  window.addEventListener('mousemove', event => {
    mouse.x = event.clientX - navWidth
    mouse.y = event.clientY
  })

  for (let i = 0; i < 5; i++) {
    points.push(new Point(0, 0, i * 10))
  }

  animate()
}

const maxDuration = 1000

const animate = () => {
  window.requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  const time = new Date().getTime()

  for (const point of points) {
    for (let i = point.trail.length - 1; i >= 0; i--) {
      const line = point.trail[i]
      const duration = time - line.time
      if (duration >= maxDuration) {
        point.trail.splice(i, 1)
        continue
      }

      const end = line.color.lastIndexOf(',')
      const temp = line.color.slice(0, end + 1)
      const alpha = (maxDuration - duration) / 1000
      line.setColor(`${temp} ${alpha})`)
      //line.update()
    }
    point.update()
  }
}

const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function Point (x, y, distance) {
  this.x = x
  this.y = y
  this.time = new Date().getTime()
  this.color = 'rgba(0, 255, 255, 1)'
  this.distance = distance
  this.trail = []

  this.update = () => {
    const lastPoint = { x: this.x, y: this.y }
    this.x = mouse.x
    this.y = mouse.y
    /* TODO! The line that is added to the trail will always be the line that is connected to the cursor.
    Before adding a new line to the trail, go through the existing lines and update their position accordingly. */
    //this.updateTrail()
    this.trail.unshift(new Line(this.x, this.y, lastPoint))
    this.draw(lastPoint)
  }

  this.draw = lastPoint => {
    if (this.trail.length === 0) return
    const line = this.trail[0]
    c.beginPath()
    c.lineWidth = 1
    c.moveTo(line.x, line.y)
    c.strokeStyle = 'cyan'
    for (let i = 0; i < this.trail.length - 2; i++) {
      const line1 = this.trail[i]
      const line2 = this.trail[i + 1]
      const xc = (line1.x + line2.x) / 2
      const xy = (line1.y + line2.y) / 2

      c.quadraticCurveTo(line1.x, line1.y, xc, xy)
    }
    c.stroke()
    c.closePath()
    /*const line1 = this.trail[0]
    const line2 = this.trail[this.trail.length - 1]
    c.beginPath()
    c.lineWidth = 1
    c.moveTo(line1.x, line1.y)
    c.strokeStyle = 'cyan'

    const xc = line1.x + line2.x + this.distance
    const xy = line1.y + line2.y + this.distance

    c.quadraticCurveTo(xc, xy, line2.x, line2.y)

    c.stroke()
    c.closePath()*/
  }

  this.updateTrail = () => {
    const limit = 900
    for (let i = 0; i < this.trail.length - 2; i++) {
      const line1 = this.trail[i]
      const line2 = this.trail[i + 1]
      const xDiff = line1.x - line2.x
      const yDiff = line1.y - line2.y
      line1.x += Math.sin(i + this.distance) * this.distance
      line1.y += Math.sin(i + this.distance) * this.distance
    }
  }
}

function Line (x, y, lastPoint) {
  this.x = x
  this.y = y
  this.originalX = x
  this.originalY = y
  this.lastPoint = lastPoint
  this.time = new Date().getTime()
  this.color = 'rgba(0, 255, 255, 1)'

  this.setColor = color => {
    this.color = color
  }
}
