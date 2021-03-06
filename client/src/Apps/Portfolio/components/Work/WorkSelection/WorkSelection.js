import React, { Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WorkSelection.css'
import ProjectThumbnail from './ProjectThumbnail/ProjectThumbnail'
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
    /*const length = this.data.length

    while (this.data.length < 9) {
      const ix = Math.floor(Math.random() * length)
      this.data.push(this.data[ix])
    }*/
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
            <div id='inner-work-container'>
              {this.data.map((d, i) => {
                return (
                  <ProjectThumbnail
                    key={i.toString()}
                    setProject={this.props.setProject}
                    setShowProject={this.props.setShowProject}
                    project={d}
                  />
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
}
