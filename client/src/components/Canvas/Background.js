export const initBackground = () => {
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  let square = null
  const parts = []

  const mouse = { x: 0, y: 0 }
  const {
    offsetHeight: innerHeight,
    offsetWidth: innerWidth
  } = document.querySelector('#main-canvas-container')
  const { offsetWidth: navWidth } = document.querySelector(
    '#navigation-container'
  )

  canvas.width = innerWidth
  canvas.height = innerHeight

  function Part (points, color) {
    this.points = points
    this.color = color

    this.update = () => {
      this.draw()
    }

    this.draw = () => {
      c.beginPath()
      const { x, y } = this.points[0]
      c.moveTo(x, y)

      for (let i = 1; i < this.points.length; i++) {
        c.lineTo(points[i].x, points[i].y)
      }
      c.fillStyle = this.color
      c.fill()
      c.closePath()
    }
  }

  function Particle (x, y, radius, color) {
    this.radius = radius
    this.x = x
    this.y = y
    this.shift = { x: 0, y: 0 }
    this.radians = Math.random() * Math.PI * 2
    this.motion = false
    this.color = color

    this.update = (x, y, color) => {
      this.x = x
      this.y = y
      this.color = color

      this.draw()
    }

    this.draw = () => {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
      c.fillStyle = this.color
      c.fill()
      c.closePath()
    }
  }

  function Square (length) {
    this.length = length
    this.particles = []
    this.x = mouse.x
    this.y = mouse.y
    this.radius = 2
    this.void = 0
    this.velocity = 0.05
    this.lastMouse = { x: mouse.x, y: mouse.y }

    this.init = () => {
      const l = this.length / 2

      for (let x = this.x - l; x < this.x + l; x += this.radius) {
        const temp = []
        for (let y = this.y - l; y < this.y + l; y += this.radius) {
          temp.push(new Particle(x, y, this.radius, 'blue'))
        }
        this.particles.push(temp)
      }
    }

    this.update = () => {
      const lastPoint = { x: this.x, y: this.y }
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

      this.void += this.void >= 50 ? 0 : 1
      const xDir = this.x - lastPoint.x
      const yDir = this.y - lastPoint.y

      this.lastMouse.x += this.x - this.lastMouse.x + xDir * this.velocity
      this.lastMouse.y += this.y - this.lastMouse.y + yDir * this.velocity

      for (let i = 0; i < this.particles.length; i++) {
        for (let j = 0; j < this.particles[i].length; j++) {
          const particle = this.particles[i][j]

          const { red, green, blue, alpha } = getRgba(
            i * this.radius,
            j * this.radius,
            this.length,
            imageData.data
          )
          let x = mouse.x - l + i * this.radius + particle.shift.x
          let y = mouse.y - l + j * this.radius + particle.shift.y
          const xDist = mouse.x - x
          const yDist = mouse.y - y
          const distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))

          if (particle.motion || distance <= this.void) {
            particle.motion = true
            particle.radians += this.velocity
            x =
              this.lastMouse.x +
              Math.cos(particle.radians) * this.void +
              Math.random() * 10 -
              5
            y =
              this.lastMouse.y +
              Math.sin(particle.radians) * this.void +
              Math.random() * 10 -
              5
          }

          particle.update(x, y, `rgb(${red}, ${green}, ${blue}, ${alpha})`)
        }
      }
    }

    this.draw = () => {
      const l = this.length / 2

      c.beginPath()
      c.rect(this.x - l, this.y - l, this.length - 2, this.length - 2)
      c.fillStyle = '#1d1d1d'
      c.fill()
      c.closePath()
    }
  }

  const getRgba = (x, y, width, data) => {
    const red = y * (width * 4) + x * 4
    return {
      red: data[red],
      green: data[red + 1],
      blue: data[red + 2],
      alpha: data[red + 3]
    }
  }

  const init = event => {
    window.removeEventListener('mousemove', init)
    window.addEventListener('mousemove', mousemove)

    const points1 = [
      { x: 0, y: 0 },
      { x: 0, y: innerHeight },
      { x: innerWidth, y: 0 }
    ]
    parts.push(new Part(points1, 'blue'))
    const points2 = [
      { x: 0, y: innerHeight },
      { x: innerWidth, y: innerHeight },
      { x: innerWidth, y: 0 }
    ]
    parts.push(new Part(points2, 'red'))
    square = new Square(100)
    square.init()
    mousemove(event)
    animate()
  }

  window.addEventListener('mousemove', init)

  const mousemove = event => {
    mouse.x = event.clientX - navWidth
    mouse.y = event.clientY
  }

  const animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.strokeStyle = 'blue'

    for (const part of parts) {
      part.update()
    }

    square.update()

    window.requestAnimationFrame(animate)
  }
}
