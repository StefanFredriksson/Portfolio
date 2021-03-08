import React from 'react'
import './Navigation.css'

export default function Navigation (props) {
  return (
    <div id='project-navigation-container'>
      <div id='go-back' onClick={event => props.setShowProject(false)}>
        Projects
      </div>
      <div id='images' onClick={event => props.setShowImages(true)}>
        Images
      </div>
      <div id='videos' onClick={event => props.setShowImages(false)}>
        Videos
      </div>
    </div>
  )
}
