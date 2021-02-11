import React from 'react'

export default function Programming (props) {
  return (
    <div>
      <h2>Programming</h2>
      <p>Something about my experience with programming.</p>
      <button
        className='about-button'
        onClick={props.expand}
        value={props.btnVal}
      >
        Read more
      </button>
    </div>
  )
}
