export const settings = {
  friction: 0.5,
  trails: 30,
  size: 50,
  dampening: 0.25,
  tension: 0.98
}

export function Tendril (options, mouse, c) {
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
