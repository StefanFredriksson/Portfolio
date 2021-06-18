import React, { useContext } from 'react'
import { StateContext } from '../../Store'
import Nav from './components/Nav/Nav'
import Content from './components/Content/Content'
import './Interactive.css'

export default function Portfolio () {
  const [state] = useContext(StateContext)
  return (
    <div>
      <style>
        {`:root {
          --main-color: ${state.color};
          --nav-width: ${state.navWidth}px;
        }`}
      </style>
      <Nav />
      <Content />
    </div>
  )
}
