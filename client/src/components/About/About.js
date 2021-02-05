import React, { useEffect } from 'react'
import './About.css'
import AboutMe from './Summaries/AboutMe/AboutMe'
import Hobbies from './Summaries/Hobbies/Hobbies'
import Programming from './Summaries/Programming/Programming'

const expandCss = (id, toHide) => {
  let hide = ''

  for (let i = 0; i < toHide.length; i++) {
    hide += i === toHide.length - 1 ? `#${toHide[i]}` : `#${toHide[i]}, `
  }

  return `#about-container #cards-container #${id} {
    width: 1500px;
    height: 700px;
  }

  #about-container #${id} .front-content {
    transform: translateY(0px);
  }

  #about-container #${id} .hover-content {
    display: none;
  }
  
  ${hide} {
    display: none;
  }
  `
}

export default function About () {
  useEffect(() => {
    animateGradients('about-me-color-rotate', '#ffbc00', '#ff0058')
    animateGradients('hobbies-color-rotate', '#03a9f4', '#ff0058')
    animateGradients('programming-color-rotate', '#4dff03', '#00d0ff')
  }, [])

  const animateGradients = (name, color1, color2) => {
    const style = document.createElement('style')
    let css = `@keyframes ${name} {`
    const c1 = 'background: linear-gradient('
    const c2 = `, ${color1}, ${color2});`

    for (let i = 0; i <= 100; i++) {
      css += `${i}% {${c1}${i * 3.6}deg${c2}}\n`
    }

    css += '}'
    style.innerHTML = css
    document.querySelector('#about-container').appendChild(style)
  }

  const expand = event => {
    const box = document.querySelector(`#${event.target.value}`)
    const parent = document.querySelector('#cards-container')
    const toHide = []

    for (const div of parent.children) {
      if (div !== box) toHide.push(div.id)
    }

    const style = document.createElement('style')
    style.innerHTML = expandCss(event.target.value, toHide)
    box.appendChild(style)
    document.querySelector('#about-container').addEventListener('click', revert)
  }

  const revert = event => {
    const cards = document.querySelector('#cards-container')

    for (const div of cards.childNodes) {
      const style = div.querySelector('style')
      if (style) div.removeChild(style)
    }

    document
      .querySelector('#about-container')
      .removeEventListener('click', revert)
  }

  return (
    <div id='about-container'>
      <div id='cards-container'>
        <div id='about-me' className='about-box'>
          <span className='outer-span'>
            <span className='inner-span' />
          </span>
          <div className='content'>
            <div className='front-content'>
              <h1>About me</h1>
            </div>
            <div className='hover-content'>
              <AboutMe expand={expand} />
            </div>
          </div>
        </div>
        <div id='hobbies' className='about-box'>
          <span className='outer-span'>
            <span className='inner-span' />
          </span>
          <div className='content'>
            <div className='front-content'>
              <h1>Hobbies</h1>
            </div>
            <div className='hover-content'>
              <Hobbies expand={expand} />
            </div>
          </div>
        </div>
        <div id='programming' className='about-box'>
          <span className='outer-span'>
            <span className='inner-span' />
          </span>
          <div className='content'>
            <div className='front-content'>
              <h1>Programming</h1>
            </div>
            <div className='hover-content'>
              <Programming expand={expand} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
