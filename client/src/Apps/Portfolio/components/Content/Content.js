import React, { useEffect, useContext } from 'react'
import './Content.css'
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom'
import { endpoints } from '../../../../Data'
import { AnimatePresence } from 'framer-motion'
import { StateContext } from '../../../../Store'
import Homepage from '../Homepage/Homepage'
import About from '../About/About'
import Skills from '../Skills/Skills'
import Work from '../Work/Work'
import Contact from '../Contact/Contact'
import Canvas from '../Canvas/Canvas'

export default function Content () {
  const { path } = useRouteMatch()
  const [state] = useContext(StateContext)
  const location = useLocation()
  let container = null

  useEffect(() => {
    container = document.querySelector('#main-content-container')
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const resize = event => {
    const width =
      window.innerWidth <= state.navSwap
        ? window.innerWidth
        : window.innerWidth - state.navWidth
    container.style.width = `${width}px`
  }

  return (
    <div id='main-content-container'>
      <Canvas />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={`${path}/${endpoints.about}`}>
            <About />
          </Route>
          <Route path={`${path}/${endpoints.skills}`}>
            <Skills />
          </Route>
          <Route path={`${path}/${endpoints.work}`}>
            <Work />
          </Route>
          <Route path={`${path}/${endpoints.contact}`}>
            <Contact />
          </Route>
          <Route path={`${path}/${endpoints.home}`}>
            <Homepage />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  )
}