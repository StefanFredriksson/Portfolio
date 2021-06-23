import React, { useEffect } from 'react'
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
  const container = {
    element: null,
    pos: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    parent: null
  }

  useEffect(() => {
    container.element = document.querySelector('#visual-skills-background')
    container.parent = document.querySelector('#visual-skills-container')
    container.direction.x = getRandomValue()
    container.direction.y = getRandomValue()
    move()
  }, [])

  const getRandomValue = () => {
    return (
      (Math.random() * 2 + 1) * (Math.floor(Math.random() * 2) === 0 ? 1 : -1)
    )
  }

  const adjustPosition = () => {
    container.pos.y = container.element.offsetTop + container.direction.y
    container.pos.x = container.element.offsetLeft + container.direction.x

    if (
      (container.pos.x + container.element.offsetWidth >=
        container.parent.offsetWidth &&
        container.direction.x > 0) ||
      (container.pos.x <= 0 && container.direction.x < 0)
    ) {
      container.direction.x *= -1
    }

    if (
      (container.pos.y + container.element.offsetHeight >=
        container.parent.offsetHeight &&
        container.direction.y > 0) ||
      (container.pos.y <= 0 && container.direction.y < 0)
    ) {
      container.direction.y *= -1
    }

    container.element.style.top = `${container.pos.y}px`
    container.element.style.left = `${container.pos.x}px`
  }

  const move = () => {
    adjustPosition()

    window.requestAnimationFrame(move)
  }

  return (
    <motion.div id='visual-skills-container' className='skills-container'>
      <span id='visual-skills-background' />
      <div id='inner-visual-skills-container'>
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
      </div>
    </motion.div>
  )
}
