import React, { useState } from 'react'
import './Work.css'
import WorkSelection from './WorkSelection/WorkSelection'
import Project from './Project/Project'

export default function Work () {
  const [showProject, setShowProject] = useState(false)
  const [project, setProject] = useState({})
  return (
    <div id='main-work-container'>
      {showProject ? (
        <Project project={project} setShowProject={setShowProject} />
      ) : (
        <WorkSelection
          setShowProject={setShowProject}
          setProject={setProject}
        />
      )}
    </div>
  )
}
