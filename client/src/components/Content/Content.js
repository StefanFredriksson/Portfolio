import React from 'react'
import './Content.css'
import { Switch, Route, useLocation } from 'react-router-dom'
import { endpoints } from '../../Data'
import { AnimatePresence } from 'framer-motion'
import Homepage from '../Homepage/Homepage'
import About from '../About/About'
import Skills from '../Skills/Skills'
import Work from '../Work/Work'
import Contact from '../Contact/Contact'
import Canvas from '../Canvas/Canvas'
import Scroll from '../Scroll/Scroll'

export default function Content () {
  const location = useLocation()

  return (
    <div id='main-content-container'>
      <Canvas />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={`/${endpoints.about}`}>
            <About />
          </Route>
          <Route path={`/${endpoints.skills}`}>
            <Skills />
          </Route>
          <Route path={`/${endpoints.work}`}>
            <Work />
          </Route>
          <Route path={`/${endpoints.contact}`}>
            <Contact />
          </Route>
          <Route path={`/${endpoints.home}`}>
            <Homepage />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  )
}
