import React, { useEffect } from 'react'
import './Content.css'
import { Switch, Route } from 'react-router-dom'
import { endpoints } from '../../Data'
import Homepage from '../Homepage/Homepage'
import About from '../About/About'
import Skills from '../Skills/Skills'
import Work from '../Work/Work'
import Contact from '../Contact/Contact'
import Canvas from '../Canvas/Canvas'
import BackgroundShape from './BackgroundShape/BackgroundShape'

export default function Content () {
  useEffect(() => {
    const container = document.querySelector('#main-content-container')
    console.log(container.offsetWidth, container.offsetHeight)
  })
  return (
    <div id='main-content-container'>
      <Switch>
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
      <BackgroundShape />
      <Canvas />
    </div>
  )
}
