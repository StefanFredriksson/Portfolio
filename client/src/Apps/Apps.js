import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Portfolio from './Portfolio/Portfolio'
import AppNavigation from './AppNavigation'

export default function Apps () {
  return (
    <div id='app-container'>
      <Switch>
        <Route path='/portfolio'>
          <Portfolio />
        </Route>
        <Route path='/'>
          <AppNavigation />
        </Route>
      </Switch>
    </div>
  )
}
