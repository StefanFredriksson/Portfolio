import React from 'react'
import './ProjectThumbnail.css'

export default function ProjectThumbnail ({
  setProject,
  setShowProject,
  project
}) {
  return (
    <div
      onClick={event => {
        setProject(project)
        setShowProject(true)
      }}
      className='project-thumbnail-container'
    >
      <div className='project-thumbnail'>
        <span className='view-project'>View project</span>
        <img src={project.thumbnail} alt='' className='project-thumbnail' />
      </div>
      <label className='project-title'>{project.title}</label>
    </div>
  )
}
