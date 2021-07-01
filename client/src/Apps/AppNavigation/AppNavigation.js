import React from 'react'
import './AppNavigation.css'
import AppThumbnail from './AppThumbnail/AppThumbnail'
const apps = [
  { path: '/portfolio/home', src: 'portfolio.png', title: 'Portfolio' }
]

export default function AppNavigation () {
  return (
    <div id='outer-app-navigation-container'>
      <div id='inner-app-navigation-container'>
        {apps.map((app, i) => {
          return (
            <AppThumbnail
              key={i.toString()}
              path={app.path}
              src={app.src}
              title={app.title}
            />
          )
        })}
      </div>
    </div>
  )
}
