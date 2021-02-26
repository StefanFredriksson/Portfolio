import React, { useEffect, useState } from 'react'
import './About.css'
import './Summaries/Expanded.css'
import AboutMe from './Summaries/AboutMe/AboutMe'
import Hobbies from './Summaries/Hobbies/Hobbies'
import Programming from './Summaries/Programming/Programming'

export default function About () {
  const [aboutMe, setAboutMe] = useState(false)
  const [hobbies, setHobbies] = useState(false)
  const [programming, setProgramming] = useState(false)

  return (
    <div id='about-container'>
      <div id='cards-container'>
        <div
          id='about-me-container'
          onClick={event => {
            event.currentTarget.classList.toggle('active-card')
            setAboutMe(!aboutMe)
          }}
        >
          {aboutMe ? <AboutMe /> : <h1>About me</h1>}
        </div>
        <div
          id='hobbies-container'
          onClick={event => {
            event.currentTarget.classList.toggle('active-card')
            setHobbies(!hobbies)
          }}
        >
          {hobbies ? <Hobbies /> : <h1>Hobbies</h1>}
        </div>
        <div
          id='programming-container'
          onClick={event => {
            event.currentTarget.classList.toggle('active-card')
            setProgramming(!programming)
          }}
        >
          {programming ? <Programming /> : <h1>Programming</h1>}
        </div>
      </div>
    </div>
  )
}
