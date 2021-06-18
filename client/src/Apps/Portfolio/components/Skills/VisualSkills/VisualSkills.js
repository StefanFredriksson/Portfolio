import React from 'react'
import { motion } from 'framer-motion'
import './VisualSkills.css'
import Indicator from './Indicator/Indicator'
const imgPath = '../img/skills/'

export default function VisualSkills () {
  const data = [
    {
      icons: [`${imgPath}front-end.png`],
      title: 'front-end',
      width: '80%',
      background: 'rgb(241, 101, 41)'
    },
    {
      icons: [`${imgPath}nodejs.png`],
      title: 'NodeJS',
      width: '85%',
      background: 'rgb(105, 188, 72)'
    },
    {
      icons: [`${imgPath}expressjs.png`],
      title: 'ExpressJS',
      width: '90%',
      background: 'rgb(247, 223, 29)'
    },
    {
      icons: [`${imgPath}reactjs.png`],
      title: 'ReactJS',
      width: '80%',
      background: 'rgb(9, 217, 254)'
    },
    {
      icons: [`${imgPath}mongodb.png`],
      title: 'MongoDB',
      width: '65%',
      background: 'rgb(142, 113, 78)'
    },
    {
      icons: [`${imgPath}csharp.png`],
      title: 'C#',
      width: '60%',
      background: 'rgb(159, 117, 218)'
    }
  ]

  return (
    <motion.div id='visual-skills-container' className='skills-container'>
      {data.map((d, i) => {
        return (
          <Indicator
            icons={d.icons}
            title={d.title}
            width={d.width}
            background={d.background}
            index={i}
          />
        )
      })}
    </motion.div>
  )
}
