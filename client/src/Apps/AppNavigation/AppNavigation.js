import React, { useState, useContext } from 'react'
import './AppNavigation.css'
import SplashScreen from './SplashScreen/SplashScreen'
import AppSelection from './AppSelection/AppSelection'
import './WidthResponsive.css'
import { StateContext } from '../../Store'
const apps = [
  { path: '/portfolio/home', src: 'portfolio.png', title: 'Portfolio' }
]

export default function AppNavigation () {
  const [splash, setSplash] = useState(true)
  const [state] = useContext(StateContext)

  return (
    <div id='outer-app-navigation-container'>
      {splash && state.firstTime ? (
        <SplashScreen setSplash={setSplash} />
      ) : (
        <AppSelection apps={apps} />
      )}
    </div>
  )
}
