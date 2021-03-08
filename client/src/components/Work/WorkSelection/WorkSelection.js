import React from 'react'
import './WorkSelection.css'
import { workImgPath as imgPath } from '../../../Data'

export default function WorkSelection (props) {
  const data = [
    {
      thumbnail: `${imgPath}project1/thumbnail.jpg`,
      folder: 'project1/',
      images: ['1.jpg', '2.jpg'],
      videos: [],
      title: 'Sudoku'
    },
    {
      thumbnail: `${imgPath}project2/thumbnail.jpg`,
      folder: 'project2/',
      images: ['1.jpg', '2.jpg'],
      videos: [{ thumbnail: '1.jpg', src: '1.mp4' }],
      title: 'Analysis'
    }
  ]
  return (
    <div id='outer-work-container'>
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
    </div>
  )
}
