export const enlargeImage = (target, path, selected, setSelected) => {
  const nav = document.querySelector('#navigation-container')
  const div = document.querySelector('#selected-image-container')
  const pos = target.getBoundingClientRect()
  const x = pos.x - nav.offsetWidth
  const y = pos.y
  div.style.left = x + 'px'
  div.style.top = y + 'px'
  div.style.width = target.offsetWidth + 'px'
  div.style.height = target.offsetHeight + 'px'
  document.querySelector('#inner-project-container').style.filter = 'blur(30px)'
  setTimeout(() => {
    div.style.transition = '0.5s'
    const container = document.querySelector('#inner-project-container')
    const mx = container.offsetWidth / 2.0
    const my = container.offsetHeight / 2.0
    const width = container.offsetWidth * 0.9
    const height = container.offsetHeight * 0.9
    const fx = mx - width / 2.0 - x - nav.offsetWidth
    const fy = my - height / 2.0 - y
    div.style.width = '90vw'
    div.style.height = '90vh'
    div.style.transform = `translate(${fx}px, ${fy}px)`
  }, 0)

  setTimeout(() => {
    div.querySelector('img').style.objectFit = 'contain'
  }, 100)

  div.querySelector('img').src = path
  selected.width = target.offsetWidth
  selected.height = target.offsetHeight
  selected.state = true
  selected.div = target
  setSelected({ ...selected })
}

export const minimizeImage = (target, selected, setSelected) => {
  target.style.transform = ''
  target.style.width = selected.width + 'px'
  target.style.height = selected.height + 'px'
  document.querySelector('#inner-project-container').style.filter = ''

  setTimeout(() => {
    target.querySelector('img').style.objectFit = ''
  }, 300)

  setTimeout(() => {
    target.style.transition = ''
    target.style.width = '0'
    target.style.height = '0'
    target.querySelector('img').src = '#'
  }, 500)

  selected.state = false
  setSelected({ ...selected })
}
