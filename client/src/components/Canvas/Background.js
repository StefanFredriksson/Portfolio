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
      c.lineTo(endPoint.x, endPoint.y)
      c.stroke()
    }
  }

  function Square (length) {
    this.length = length
    this.particles = []
    this.particleCount = 0
    this.x = mouse.x
    this.y = mouse.y
    this.radius = 1
    this.void = 0
    this.maxVoid = 50

    this.init = () => {
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
      console.log(this.particles.length)
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

      this.void += this.void >= l ? 0 : 1
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
          let endPoint = { x: x + particle.radius, y }

          if (distance < 0) {
            particle.shift.y = (diameter / 2) * Math.sin(Math.PI + radians * j)
            particle.shift.x = (diameter / 2) * Math.cos(Math.PI + radians * j)
            endPoint.x =
              this.x + (diameter / 2) * Math.cos(Math.PI + radians * (j + 1))
            endPoint.y =
              this.y + (diameter / 2) * Math.sin(Math.PI + radians * (j + 1))
          } else if (distance > 0) {
            const increment = this.particles[i].length - 1 - j
            particle.shift.y = (diameter / 2) * Math.sin(radians * increment)
            particle.shift.x = (diameter / 2) * Math.cos(radians * increment)
            endPoint.x =
              this.x + (diameter / 2) * Math.cos(radians * (increment - 1))
            endPoint.y =
              this.y + (diameter / 2) * Math.sin(radians * (increment - 1))
          }

          particle.update({ x, y }, endPoint, color)
        }
      }
    }

    this.draw = () => {
      const l = this.length / 2

      c.beginPath()
      c.arc(this.x, this.y, l - 1, 0, 2 * Math.PI, false)
      c.fillStyle = '#1d1d1d'
      c.fill()
      c.closePath()
    }
  }

  const getRgba = (data, index) => {
    return `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${
      data[index + 3]
    })`
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

    for (const part of parts) {
      part.update()
    }

    c.beginPath()
    c.rect(600, 800, 100, 50)
    c.fillStyle = 'green'
    c.fill()
    c.closePath()

    square.update()

    window.requestAnimationFrame(animate)
  }
}
