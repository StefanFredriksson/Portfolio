import React, { useEffect, useContext } from 'react'
import './Scroll.css'
import { StateContext } from '../../Store'
import Homepage from '../Homepage/Homepage'
import About from '../About/About'
import Skills from '../Skills/Skills'
import Work from '../Work/Work'
import Contact from '../Contact/Contact'
import { endpoints } from '../../Data'

export default function Scroll () {
  const [state, setState] = useContext(StateContext)
  let containers = []
  useEffect(() => {
    containers = [
      {
        element: document.querySelector('#homepage-container'),
        active: true,
        path: endpoints.home
      },
      {
        element: document.querySelector('#about-container'),
        active: false,
        path: endpoints.about
      },
      {
        element: document.querySelector('#main-skills-container'),
        active: false,
        path: endpoints.skills
      },
      {
        element: document.querySelector('#main-work-container'),
        active: false,
        path: endpoints.work
      },
      {
        element: document.querySelector('#main-contact-container'),
        active: false,
        path: endpoints.contact
      }
    ]

    for (let i = 0; i < containers.length; i++) {
      const c = containers[i]
      c.element.style.transition = '1s'
    }
    const mainContainer = document.querySelector('#main-content-container')
    mainContainer.addEventListener('mousewheel', scroll)
  }, [])

  const scroll = event => {
    const mainContainer = document.querySelector('#main-content-container')
    const direction = event.wheelDelta

    for (let i = 0; i < containers.length; i++) {
      const c = containers[i]

      if (c.active && direction < 0 && i !== containers.length - 1) {
        c.active = false
        const tempC = containers[i + 1]
        tempC.active = true
        state.path = tempC.path
        setState({ ...state })
        const { y } = tempC.element.getBoundingClientRect()
        c.element.style.transform = `translateY(-${y}px)`
        tempC.element.style.transform = `translateY(-${y}px)`
        break
      } else if (c.active && direction > 0 && i !== 0) {
        c.active = false
        const tempC = containers[i - 1]
        tempC.active = true
        state.path = tempC.path
        setState({ ...state })
        const { y } = tempC.element.getBoundingClientRect()
        c.element.style.transform = `translateY(${y +
          mainContainer.offsetHeight}px)`
        tempC.element.style.transform = `translateY(${y * (i - 1)}px)`
        break
      }
    }
  }
  return (
    <div id='scroll-container'>
      <Homepage />
      <About />
      <Skills />
      <Work />
      <Contact />
    </div>
  )
}
