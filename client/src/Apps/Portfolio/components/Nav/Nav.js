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
    document.querySelector('#nav-hamburger').addEventListener('click', dropdown)
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

  const dropdown = event => {
    event.currentTarget.classList.toggle('nav-hamburger-active')
    document
      .querySelector('.nav-dropdown')
      .classList.toggle('nav-dropdown-active')
  }

  return (
    <div id='navigation-container'>
      <Link to='/'>
        <img id='logo' src='../img/Logo.svg' alt='Logo' />
      </Link>
      <div id='info-container'>
        <div id='nav-hamburger'>
          <span id='ham-top' />
          <span id='ham-middle' />
          <span id='ham-bottom' />
        </div>
        <div className='nav-dropdown'>
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
                state.path === endpoints.skills
                  ? styling.active
                  : styling.stroke
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
                state.path === endpoints.contact
                  ? styling.active
                  : styling.stroke
              }
              sWidth={styling.sWidth}
              fill={styling.fill}
              path={endpoints.contact}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Nav)
