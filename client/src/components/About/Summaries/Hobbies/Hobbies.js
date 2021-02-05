import React from 'react'

export default function Hobbies (props) {
  return (
    <div>
      <h2>Hobbies</h2>
      <ul>
        <li>Video games</li>
        <li>TV</li>
        <li>Music</li>
        <li>Golf</li>
        <li>Programming</li>
        <li>Slalom</li>
      </ul>
      <button onClick={props.expand} value='hobbies'>
        Read more.
      </button>
    </div>
  )
}
