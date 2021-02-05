import React from 'react'

export default function Programming (props) {
  return (
    <div>
      <h2>Programming</h2>
      <p>Something about my experience with programming.</p>
      <button onClick={props.expand} value='programming'>
        Read more.
      </button>
    </div>
  )
}
