export const initCanvas = () => {
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  const container = document.querySelector('#main-content-container')

  function TopPart (offset, speed) {
    this.points = 4
    this.yIncr = 0
    this.xIncr = 0
    this.offset = offset
    this.speed = speed
    this.height = 0
    this.animating = false

    this.update = () => {
      this.xIncr = canvas.width / this.points
      this.yIncr = canvas.height / 10
      this.height = canvas.height * 0.1
      if (this.animating) this.move()
      this.draw()
    }

    this.draw = () => {
      const y =
        this.getY(this.offset) < this.height
          ? this.height
          : this.getY(this.offset)
      c.save()
      c.beginPath()
      c.fillStyle = 'rgb(142, 153, 250)'
      c.moveTo(0, 0)
      c.lineTo(0, y)
      for (let i = 1; i <= this.points; i++) {
        c.quadraticCurveTo(
          this.xIncr * i - this.xIncr / 2,
          i % 2 === 0 ? y + this.yIncr : y - this.yIncr,
          this.xIncr * i,
          y
        )
      }
      c.lineTo(canvas.width, 0)
      c.lineTo(0, 0)
      c.fill()
      c.restore()
    }

    this.getY = offset => {
      return offset + this.height
    }

    this.move = () => {
      this.offset += this.speed
      if (
        (this.speed > 0 && this.getY(this.offset) >= canvas.height / 2) ||
        (this.speed < 0 && this.getY(this.offset) <= this.height)
      ) {
        if (this.speed < 0) this.animating = false
        this.speed *= -1
      }
    }
  }

  function BottomPart (offset, speed) {
    this.points = 4
    this.yIncr = 0
    this.xIncr = 0
    this.offset = offset
    this.speed = speed * -1
    this.height = 0
    this.animating = false

    this.update = () => {
      this.xIncr = canvas.width / this.points
      this.yIncr = canvas.height / 10
      this.height = canvas.height * 0.9
      if (this.animating) this.move()
      this.draw()
    }

    this.draw = () => {
      const y =
        this.getY(this.offset) > this.height
          ? this.height
          : this.getY(this.offset)
      c.save()
      c.beginPath()
      c.fillStyle = 'rgb(142, 153, 250)'
      c.moveTo(0, canvas.height)
      c.lineTo(0, y)
      for (let i = 1; i <= this.points; i++) {
        c.quadraticCurveTo(
          this.xIncr * i - this.xIncr / 2,
          i % 2 === 0 ? y + this.yIncr : y - this.yIncr,
          this.xIncr * i,
          y
        )
      }
      c.lineTo(canvas.width, canvas.height)
      c.lineTo(0, canvas.height)
      c.fill()
      c.restore()
    }

    this.getY = offset => {
      return this.height - offset
    }

    this.move = () => {
      this.offset -= this.speed
      if (
        (this.speed > 0 && this.getY(this.offset) >= this.height) ||
        (this.speed < 0 && this.getY(this.offset) <= canvas.height / 2)
      ) {
        if (this.speed > 0) this.animating = false
        this.speed *= -1
      }
    }
  }

  let bottomPart = null
  let topPart = null
  let containers = []

  const init = event => {
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

    const speed = 16
    topPart = new TopPart(0, speed)
    bottomPart = new BottomPart(0, speed)

    container.addEventListener('mousewheel', scroll)

    animate()
  }

  const scroll = event => {
    if (topPart.animating || bottomPart.animating) return
    const direction = event.wheelDelta

    for (let i = 0; i < containers.length; i++) {
      const c = containers[i]

      if (c.active && direction < 0 && i !== containers.length - 1) {
        c.active = false
        const tempC = containers[i + 1]
        tempC.active = true
        const { y } = tempC.element.getBoundingClientRect()
        c.element.style.transform = `translateY(-${y}px)`
        tempC.element.style.transform = `translateY(-${y}px)`
        topPart.animating = true
        bottomPart.animating = true
        break
      } else if (c.active && direction > 0 && i !== 0) {
        c.active = false
        const tempC = containers[i - 1]
        tempC.active = true
        const { y } = tempC.element.getBoundingClientRect()
        c.element.style.transform = `translateY(${y + canvas.height}px)`
        tempC.element.style.transform = `translateY(${y * (i - 1)}px)`
        topPart.animating = true
        bottomPart.animating = true
        break
      }
    }
  }

  const animate = () => {
    topPart.update()
    bottomPart.update()

    window.requestAnimationFrame(animate)
  }

  init()
}
