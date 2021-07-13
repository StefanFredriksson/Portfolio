import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Portfolio from './Portfolio/Portfolio'
import AppNavigation from './AppNavigation/AppNavigation'
import NotFound from './NotFound/NotFound'
import Workout from './Workout/Workout'

export default function Apps () {
  return (
    <div id='app-container'>
      <Switch>
        <Route path='/portfolio'>
          <Portfolio />
        </Route>
        <Route path='/workout'>
          <Workout />
        </Route>
        <Route exact path='/'>
          <AppNavigation />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}
