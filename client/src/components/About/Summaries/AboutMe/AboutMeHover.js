import React from 'react'

export default function AboutMe (props) {
  return (
    <div>
      <h2>Who am i?</h2>
      <ul>
        <li>26 year old guy from Sweden.</li>
        <li>Not great at social interactions.</li>
        <li>Enjoys solving problems.</li>
        <li>Have an easy time focusing on task at hand.</li>
      </ul>
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
