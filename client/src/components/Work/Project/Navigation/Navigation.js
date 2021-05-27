import React, { useContext } from 'react'
import { StateContext } from '../../../../Store'
import './Navigation.css'

export default function Navigation (props) {
  const [state] = useContext(StateContext)
  return (
    <div id='project-navigation-container'>
      <div id='go-back' onClick={event => props.setShowProject(false)}>
        Projects
      </div>
      <div
        id='images-nav'
        className={props.showImages ? 'active' : ''}
        onClick={event => {
          event.currentTarget.classList.add('active')
          document.querySelector('#videos-nav').classList.remove('active')
          props.setShowImages(true)
        }}
      >
        Images
      </div>
      <div
        id='videos-nav'
        className={!props.showImages ? 'active' : ''}
        onClick={event => {
          event.currentTarget.classList.add('active')
          document.querySelector('#images-nav').classList.remove('active')
          props.setShowImages(false)
        }}
      >
        Videos
      </div>
    </div>
  )
}
