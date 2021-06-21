import React, { useContext, useEffect } from 'react'
import { StateContext } from '../../../../Store'
import './Nav.css'
import './Paths/Paths.css'
import { withRouter, Link, useRouteMatch } from 'react-router-dom'
import { endpoints } from '../../../../Data'
import About from './Paths/About/About'
import Homepage from './Paths/Homepage/Homepage'
import Contact from './Paths/Contact/Contact'
import Skills from './Paths/Skills/Skills'
import Work from './Paths/Work/Work'

function Nav (props) {
  const { path } = useRouteMatch()
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
      const classList = event.target.classList
      if (
        !classList.contains('nav-icon') &&
        !classList.contains('path-container')
      ) {
        return
      }
      state.path = event.target.classList[0]
      setState({ ...state })
    })
    const ix = window.location.pathname.lastIndexOf('/')
    state.path = window.location.pathname.substr(ix + 1)
    setState({ ...state })
  }, [])

  return (
    <div id='navigation-container'>
      <div id='info-container'>
        <Link to={`${path}/${endpoints.home}`}>
          <Homepage
            stroke={
              state.path === endpoints.home ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            path={endpoints.home}
          />
        </Link>
        <Link to={`${path}/${endpoints.about}`}>
          <About
            stroke={
              state.path === endpoints.about ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            fill={styling.fill}
            path={endpoints.about}
          />
        </Link>
        <Link to={`${path}/${endpoints.skills}`}>
          <Skills
            stroke={
              state.path === endpoints.skills ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            fill={styling.fill}
            path={endpoints.skills}
          />
        </Link>
        <Link to={`${path}/${endpoints.work}`}>
          <Work
            stroke={
              state.path === endpoints.work ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
            fill={styling.fill}
            path={endpoints.work}
          />
        </Link>
        <Link to={`${path}/${endpoints.contact}`}>
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
