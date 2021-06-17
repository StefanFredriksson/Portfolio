import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Work.css'
import WorkSelection from './WorkSelection/WorkSelection'
import Project from './Project/Project'
import { pageTransition } from '../../Data'

export default function Work () {
  const [showProject, setShowProject] = useState(false)
  const [project, setProject] = useState({})

  return (
    <motion.div
      id='main-work-container'
      initial='initial'
      animate='in'
      exit='out'
      variants={pageTransition.variants}
    >
      <Project
        project={project}
        setShowProject={setShowProject}
        showProject={showProject}
      />
      <WorkSelection
        setShowProject={setShowProject}
        setProject={setProject}
        showProject={showProject}
      />
    </motion.div>
  )
}
