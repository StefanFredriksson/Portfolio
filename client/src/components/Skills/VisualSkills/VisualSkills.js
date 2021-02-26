import React from 'react'
import './VisualSkills.css'
import Indicator from './Indicator/Indicator'

export default function VisualSkills () {
  const data = [
    {
      icons: ['img/front-end.png'],
      title: 'front-end',
      width: '80%',
      background: 'rgb(241, 101, 41)'
    },
    {
      icons: ['img/nodejs.png'],
      title: 'NodeJS',
      width: '85%',
      background: 'rgb(105, 188, 72)'
    },
    {
      icons: ['img/expressjs.png'],
      title: 'ExpressJS',
      width: '90%',
      background: 'rgb(247, 223, 29)'
    },
    {
      icons: ['img/reactjs.png'],
      title: 'ReactJS',
      width: '70%',
      background: 'rgb(9, 217, 254)'
    },
    {
      icons: ['img/mongodb.png'],
      title: 'MongoDB',
      width: '65%',
      background: 'rgb(142, 113, 78)'
    },
    {
      icons: ['img/csharp.png'],
      title: 'C#',
      width: '60%',
      background: 'rgb(159, 117, 218)'
    }
  ]
  return (
    <div id='visual-skills-container' className='skills-container'>
      {data.map(d => {
        return (
          <Indicator
            icons={d.icons}
            title={d.title}
            width={d.width}
            background={d.background}
          />
        )
      })}
    </div>
  )
}
