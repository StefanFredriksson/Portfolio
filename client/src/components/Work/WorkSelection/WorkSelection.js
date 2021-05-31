import React, { Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { textAnimation } from '../../../Data'
import './WorkSelection.css'
import { workText } from './workText'
import { tsp } from './ProjectData/TSP'
import { gol } from './ProjectData/3DGoL'
import { fiveInARow } from './ProjectData/FiveInARow'

const outerVariants = {
  initial: {
    y: 1000
  },
  in: {
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5
    }
  },
  out: {
    x: 2000,
    transition: {
      duration: 1
    }
  }
}

export default class WorkSelection extends Component {
  constructor (props) {
    super(props)

    this.data = [tsp, gol, fiveInARow]
  }

  render () {
    return (
      <AnimatePresence initial={false} exitBeforeEnter>
        {!this.props.showProject && (
          <motion.div
            key='workselection'
            variants={outerVariants}
            initial='initial'
            animate='in'
            exit='out'
            id='outer-work-container'
          >
            <AnimatePresence>
              <motion.div
                id='text-work-container'
                variants={textAnimation.variants}
                initial='initial'
                animate='in'
              >
                {workText}
              </motion.div>
            </AnimatePresence>
            <div id='inner-work-container'>
              {this.data.map(d => {
                return (
                  <div
                    onClick={event => {
                      this.props.setProject(d)
                      this.props.setShowProject(true)
                    }}
                  >
                    <span className='view-project'>View project</span>
                    <img src={d.thumbnail} alt='' />
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
}

/*export default function WorkSelection (props) {
  const data = [tsp, gol, fiveInARow]
  return (
    <motion.div
      key='modal'
      initial={{ y: '1000px' }}
      animate={{ y: 0 }}
      exit={{ y: '-1000px' }}
      transition={{ duration: 1 }}
      id='outer-work-container'
    >
      <motion.div id='text-work-container' variants={textAnimation.variants}>
        {workText}
      </motion.div>
      <div id='inner-work-container'>
        {data.map(d => {
          return (
            <div
              onClick={event => {
                props.setProject(d)
                props.setShowProject(true)
              }}
            >
              <span className='view-project'>View project</span>
              <img src={d.thumbnail} alt='' />
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}*/
