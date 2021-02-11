import React, { useEffect, useState } from 'react'
import './About.css'
import AboutMeHover from './Summaries/AboutMe/AboutMeHover'
import AboutMeExpanded from './Summaries/AboutMe/AboutMeExpanded'
import HobbiesHover from './Summaries/Hobbies/HobbiesHover'
import HobbiesExpanded from './Summaries/Hobbies/HobbiesExpanded'
import ProgrammingHover from './Summaries/Programming/ProgrammingHover'
import ProgrammingExpanded from './Summaries/Programming/ProgrammingExpanded'

const aboutMeId = 'about-me'
const hobbiesId = 'hobbies'
const programmingId = 'programming'

const expandCss = (id, toHide) => {
  let hide = ''

  for (let i = 0; i < toHide.length; i++) {
    hide +=
      i === toHide.length - 1
        ? `#about-container #cards-container #${toHide[i]}`
        : `#about-container #cards-container #${toHide[i]}, `
  }

  return `#about-container #cards-container #${id} {
    width: 1500px;
    height: 700px;
    left: 50%;
  }

  #about-container #${id} .front-content {
    transform: translateY(0px);
  }

  #about-container #${id} .hover-content {
    display: none;
  }
  
  ${hide} {
    top: -500px;
  }
  `
}

export default function About () {
  const [sumState, setSumState] = useState({})
  useEffect(() => {
    animateGradients('about-me-color-rotate', '#ffbc00', '#ff0058')
    animateGradients('hobbies-color-rotate', '#03a9f4', '#ff0058')
    animateGradients('programming-color-rotate', '#4dff03', '#00d0ff')
    const buttons = document.querySelectorAll('.about-button')
    const obj = {}
    for (const button of buttons) obj[button.value] = false
    setSumState({ ...obj })
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
    sumState[event.target.value] = true
    setSumState({ ...sumState })

    for (const div of parent.children) {
      if (div !== box) toHide.push(div.id)
    }

    const style = document.createElement('style')
    style.innerHTML = expandCss(event.target.value, toHide)
    box.appendChild(style)
    document.querySelector('#about-container').addEventListener('click', revert)
  }

  const revert = async event => {
    if (event.path.length > 9) return

    const cards = document.querySelector('#cards-container')
    const keys = Object.keys(sumState)

    for (const key of keys) sumState[key] = false

    setSumState({ ...sumState })

    for (const div of cards.children) {
      const style = div.querySelector('style')
      if (style) {
        await shrink(div)
        div.removeChild(style)
      }
    }

    document
      .querySelector('#about-container')
      .removeEventListener('click', revert)
  }

  const shrink = div => {
    return new Promise((resolve, reject) => {
      div.style.width = '300px'
      div.style.height = '400px'

      setTimeout(() => {
        div.style.width = ''
        div.style.height = ''
        resolve(0)
      }, 500)
    })
  }

  return (
    <div id='about-container'>
      <div id='cards-container'>
        <div id={aboutMeId} className='about-box'>
          <span className='outer-span'>
            <span className='inner-span' />
          </span>
          <div className='content'>
            <div className='front-content'>
              {sumState[aboutMeId] ? <AboutMeExpanded /> : <h1>About me</h1>}
            </div>
            <div className='hover-content'>
              <AboutMeHover btnVal={aboutMeId} expand={expand} />
            </div>
          </div>
        </div>
        <div id={hobbiesId} className='about-box'>
          <span className='outer-span'>
            <span className='inner-span' />
          </span>
          <div className='content'>
            <div className='front-content'>
              {sumState[hobbiesId] ? <HobbiesExpanded /> : <h1>Hobbies</h1>}
            </div>
            <div className='hover-content'>
              <HobbiesHover btnVal={hobbiesId} expand={expand} />
            </div>
          </div>
        </div>
        <div id={programmingId} className='about-box'>
          <span className='outer-span'>
            <span className='inner-span' />
          </span>
          <div className='content'>
            <div className='front-content'>
              {sumState[programmingId] ? (
                <ProgrammingExpanded />
              ) : (
                <h1>Programming</h1>
              )}
            </div>
            <div className='hover-content'>
              <ProgrammingHover btnVal={programmingId} expand={expand} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
