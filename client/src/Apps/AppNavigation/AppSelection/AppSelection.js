import React, { useEffect } from 'react'
import './AppSelection.css'
import AppThumbnail from '../AppThumbnail/AppThumbnail'

const wait = (duration = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, duration)
  })
}

export default function AppSelection ({ apps }) {
  useEffect(async () => {
    const container = document.querySelector('#inner-app-navigation-container')
    const thumbnails = container.querySelectorAll('.app-thumbnail')
    await wait(1000)
    container.style.width = ''
    container.style.height = ''
    await wait(1500)
    for (const thumbnail of thumbnails) {
      thumbnail.style.transform = ''
      await wait(200)
    }
  }, [])
  return (
    <div
      id='inner-app-navigation-container'
      style={{ width: '100%', height: '100%' }}
    >
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
  )
}
