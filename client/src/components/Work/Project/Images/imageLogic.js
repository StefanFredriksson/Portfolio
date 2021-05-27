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
    const container = document.querySelector('#main-project-container')
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

export const nextImages = (navOffset, images) => {
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')
  if (
    atEnd(
      container.offsetWidth,
      imageContainers[0].offsetWidth,
      images,
      navOffset
    )
  ) {
    return navOffset
  }

  for (const img of imageContainers) {
    img.style.transform = `translateX(${navOffset - container.offsetWidth}px)`
  }

  return navOffset - container.offsetWidth
}

const atEnd = (width, imgWidth, images, navOffset) => {
  const length = images.length
  if (length === 0 || !length) return true

  const fullWidth = imgWidth * length
  return navOffset * -1 >= fullWidth - width
}

export const prevImages = navOffset => {
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')
  if (navOffset >= 0) return

  for (const img of imageContainers) {
    img.style.transform = `translateX(${navOffset + container.offsetWidth}px)`
  }

  return navOffset + container.offsetWidth
}

export const moveToEnd = images => {
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')
  if (imageContainers.length === 0) return
  const width =
    (imageContainers[0].offsetWidth * imageContainers.length -
      container.offsetWidth) *
    -1
  for (const img of imageContainers) {
    img.style.transform = `translateX(${width}px)`
  }

  return width
}

export const moveToStart = () => {
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')

  for (const img of imageContainers) {
    img.style.transform = `translateX(${0}px)`
  }

  return 0
}
