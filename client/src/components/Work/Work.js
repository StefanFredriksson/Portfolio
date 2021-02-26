import React from 'react'
import './Work.css'

export default function Work () {
  const data = [{}, {}, {}, {}, {}, {}]
  return (
    <div id='outer-work-container'>
      <div id='inner-work-container'>
        {data.map(d => {
          return <div />
        })}
      </div>
    </div>
  )
}
