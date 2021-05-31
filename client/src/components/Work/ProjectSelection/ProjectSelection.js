import React, { useState } from 'react'
import WorkSelection from '../WorkSelection/WorkSelection'
import Project from '../Project/Project'

export default function ProjectSelection () {
  const [showProject, setShowProject] = useState(false)
  const [project, setProject] = useState({})
  return (
    <>
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
    </>
  )
}

/*
{showProject ? (
        <Project project={project} setShowProject={setShowProject} />
      ) : (
        <WorkSelection
          setShowProject={setShowProject}
          setProject={setProject}
        />
      )}
*/
