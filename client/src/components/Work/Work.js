import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Work.css'
import WorkSelection from './WorkSelection/WorkSelection'
import Project from './Project/Project'
import ProjectSelection from './ProjectSelection/ProjectSelection'
import { pageTransition } from '../../Data'

export default function Work () {
  return (
    <motion.div
      id='main-work-container'
      initial='initial'
      animate='in'
      exit='out'
      variants={pageTransition.variants}
    >
      <ProjectSelection />
    </motion.div>
  )
}
