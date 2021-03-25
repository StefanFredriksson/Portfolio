export const initOscillator = () => {
  let tendrils = []
  const hue = new Oscillator({
    phase: Math.random() * (Math.PI * 2),
    amplitude: 85,
    frequency: 0.0015,
    offset: 285
  })
  const settings = {
    friction: 0.5,
    trails: 30,
    size: 50,
    dampening: 0.25,
    tension: 0.98
  }
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')

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

  const init = event => {
    window.removeEventListener('mousemove', init)
    window.addEventListener('mousemove', mousemove)

    mousemove(event)
    reset()
    loop()
  }

  window.addEventListener('mousemove', init)

  const mousemove = event => {
    mouse.x = event.clientX - navWidth
    mouse.y = event.clientY
  }

  function Oscillator (options) {
    let value = 0

    this.init = options => {
      this.phase = options.phase || 0
      this.offset = options.offset || 0
      this.frequency = options.frequency || 0.001
      this.amplitude = options.amplitude || 1
    }

    this.update = () => {
      this.phase += this.frequency
      value = this.offset + Math.sin(this.phase) * this.amplitude
      return value
    }

    this.value = () => {
      return value
    }

    this.init(options || {})
  }

  function Tendril (options) {
    function Node (x, y) {
      this.x = x
      this.y = y
      this.vx = 0
      this.vy = 0
    }

    this.init = options => {
      this.spring = options.spring + Math.random() * 0.1 - 0.05
      this.friction = settings.friction + Math.random() * 0.01 - 0.005
      this.nodes = []
      for (let i = 0; i < settings.size; i++) {
        this.nodes.push(new Node(mouse.x, mouse.y))
      }
    }

    this.update = () => {
      let spring = this.spring
      let node = this.nodes[0]

      node.vx += (mouse.x - node.x) * spring
      node.vy += (mouse.y - node.y) * spring

      for (let i = 0; i < this.nodes.length; i++) {
        node = this.nodes[i]

        if (i > 0) {
          const prev = this.nodes[i - 1]
          node.vx += (prev.x - node.x) * spring
          node.vy += (prev.y - node.y) * spring
          node.vx += prev.vx * settings.dampening
          node.vy += prev.vy * settings.dampening
        }

        node.vx *= this.friction
        node.vy *= this.friction
        node.x += node.vx
        node.y += node.vy

        spring *= settings.tension
      }
    }

    this.draw = () => {
      let x = this.nodes[0].x
      let y = this.nodes[0].y
      let a = null
      let b = null

      c.beginPath()
      c.moveTo(x, y)

      for (var i = 1; i < this.nodes.length - 2; i++) {
        a = this.nodes[i]
        b = this.nodes[i + 1]
        x = (a.x + b.x) * 0.5
        y = (a.y + b.y) * 0.5

        c.quadraticCurveTo(a.x, a.y, x, y)
      }

      a = this.nodes[i]
      b = this.nodes[i + 1]

      c.quadraticCurveTo(a.x, a.y, b.x, b.y)
      c.stroke()
      c.closePath()
    }

    this.init(options || {})
  }

  const reset = () => {
    tendrils = []

    for (let i = 0; i < settings.trails; i++) {
      tendrils.push(
        new Tendril({ spring: 0.45 + 0.025 * (i / settings.trails) })
      )
    }
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const colors = ['hsla(346,98%,56%,0.25)', 'hsla(171,98%,56%,0.25)']
  const color = colors[randomIntFromInterval(0, colors.length - 1)]

  const loop = () => {
    c.globalCompositeOperation = 'source-over'
    c.fillStyle = '#1D1D1D'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.globalCompositeOperation = 'lighter'
    c.strokeStyle = 'hsla(346, 98%, 56%, 0.25)'
    c.lineWidth = 1
    c.strokeStyle = color

    for (const tendril of tendrils) {
      tendril.update()
      tendril.draw()
    }

    window.requestAnimationFrame(loop)
  }
}
