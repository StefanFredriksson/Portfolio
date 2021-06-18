import { navSwap, orientationSwap } from '../../../../../../Data'

export const enlargeImage = (target, path, selected, setSelected) => {
  const nav = document.querySelector('#navigation-container')
  const div = document.querySelector('#selected-image-container')
  const pos = target.getBoundingClientRect()
  let navWidth = 0
  let navHeight = 0
  if (window.innerWidth > navSwap) navWidth = nav.offsetWidth
  else navHeight = nav.offsetHeight
  const x = pos.x - navWidth
  const y = pos.y - navHeight
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

    const fx = mx - width / 2.0 - x - navWidth
    const fy = my - height / 2.0 - y - navHeight
    div.style.width = '90vw'
    div.style.height = '90vh'
    div.style.transform = `translate(${fx}px, ${fy}px)`
  }, 0)

  setTimeout(() => {
    div.querySelector('img').style.objectFit = 'contain'
  }, 50)

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
  }, 400)

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
  const vertical = isVertical()
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')
  if (atEnd(images, navOffset, vertical)) {
    return navOffset
  }

  const offset = vertical
    ? navOffset - container.offsetHeight
    : navOffset - container.offsetWidth

  for (const img of imageContainers) {
    img.style.transform = vertical
      ? `translateY(${offset}px)`
      : `translateX(${offset}px)`
  }

  return offset
}

export const atEnd = (images, navOffset) => {
  const vertical = isVertical()
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')
  const length = images.length
  if (length === 0 || !length) return true
  const measure = vertical ? container.offsetHeight : container.offsetWidth
  const imgMeasure = vertical
    ? imageContainers[0].offsetHeight
    : imageContainers[0].offsetWidth

  const full = imgMeasure * length
  return navOffset * -1 >= full - measure
}

export const prevImages = navOffset => {
  const vertical = isVertical()
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')
  if (navOffset >= 0) return

  for (const img of imageContainers) {
    img.style.transform = vertical
      ? `translateY(${navOffset + container.offsetHeight}px)`
      : `translateX(${navOffset + container.offsetWidth}px)`
  }

  return vertical
    ? navOffset + container.offsetHeight
    : navOffset + container.offsetWidth
}

export const moveToEnd = images => {
  let offset = 0
  let prevOffset = -1

  while (offset !== prevOffset) {
    prevOffset = offset
    offset = nextImages(offset, images)
  }

  return offset
}

export const moveToStart = () => {
  const vertical = isVertical()
  const container = document.querySelector('#project-image-container')
  const imageContainers = container.querySelectorAll('.small-image-container')

  for (const img of imageContainers) {
    img.style.transform = vertical ? `translateY(0px)` : `translateX(0px)`
  }

  return 0
}

export const isVertical = () => {
  return window.innerWidth <= orientationSwap
}

export const getLength = () => {
  const container = document.querySelector('.media-container')
  const thumbnails = container.querySelectorAll('.project-thumbnail')
  if (thumbnails.length === 0) return 0
  return isVertical()
    ? Math.floor(container.offsetHeight / thumbnails[0].offsetHeight)
    : Math.floor(container.offsetWidth / thumbnails[0].offsetWidth)
}
