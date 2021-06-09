import React, { useContext, useEffect } from 'react'
import { StateContext } from '../../Store'
import './Nav.css'
import './Paths/Paths.css'
import { withRouter, Link } from 'react-router-dom'
import { endpoints } from '../../Data'
import About from './Paths/About/About'
import Homepage from './Paths/Homepage/Homepage'
import Contact from './Paths/Contact/Contact'
import Skills from './Paths/Skills/Skills'
import Work from './Paths/Work/Work'

function Nav (props) {
  const [state, setState] = useContext(StateContext)
  const styling = {
    stroke: 'grey',
    active: state.color,
    sWidth: '2',
    fill: 'var(--darker)'
  }

  useEffect(() => {
    const container = document.querySelector('#info-container')
    container.addEventListener('click', event => {
      if (!event.target.classList.contains('nav-icon')) return
      const path = event.target.classList[0]
      state.path = path === 'home' ? '' : path
      setState({ ...state })
    })
    state.path = window.location.pathname.replace('/', '')
    setState({ ...state })
  }, [])

  return (
    <div id='navigation-container'>
      <div id='info-container'>
        <Link to={`/${endpoints.home}`}>
          <Homepage
            stroke={
              state.path === endpoints.home ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            path={'home'}
          />
        </Link>
        <Link to={`/${endpoints.about}`}>
          <About
            stroke={
              state.path === endpoints.about ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            fill={styling.fill}
            path={endpoints.about}
          />
        </Link>
        <Link to={`/${endpoints.skills}`}>
          <Skills
            stroke={
              state.path === endpoints.skills ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            fill={styling.fill}
            path={endpoints.skills}
          />
        </Link>
        <Link to={`/${endpoints.work}`}>
          <Work
            stroke={
              state.path === endpoints.work ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            fill={styling.fill}
            path={endpoints.work}
          />
        </Link>
        <Link to={`/${endpoints.contact}`}>
          <Contact
            stroke={
              state.path === endpoints.contact ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            fill={styling.fill}
            path={endpoints.contact}
          />
        </Link>
      </div>
    </div>
  )
}

export default withRouter(Nav)
