import React from 'react'
import './VisualSkills.css'
import Indicator from './Indicator/Indicator'

export default function VisualSkills () {
  const data = [
    {
      icons: ['img/front-end.png'],
      title: 'front-end'
    },
    {
      icons: ['img/nodejs.png'],
      title: 'NodeJS'
    },
    {
      icons: ['img/expressjs.png'],
      title: 'ExpressJS'
    },
    {
      icons: ['img/reactjs.png'],
      title: 'ReactJS'
    },
    {
      icons: ['img/mongodb.png'],
      title: 'MongoDB'
    },
    {
      icons: ['img/csharp.png'],
      title: 'C#'
    }
  ]
  return (
    <div id='visual-skills-container'>
      {data.map(d => {
        return <Indicator icons={d.icons} title={d.title} />
      })}
    </div>
  )
}
