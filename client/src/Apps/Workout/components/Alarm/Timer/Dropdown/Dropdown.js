import React from 'react'
import './Dropdown.css'

export default function Dropdown ({ options, identifier, optionalFunction }) {
  const handleListActive = event => {
    const container = document.querySelector(`.${identifier}`)
    container
      .querySelector('.dropdown-list')
      .classList.toggle('dropdown-list-active')
  }

  const handleOption = event => {
    const container = document.querySelector(`.${identifier}`)
    container.querySelector('.selected-value').textContent =
      event.target.textContent
    container
      .querySelector('.dropdown-list')
      .classList.toggle('dropdown-list-active')
    if (optionalFunction) optionalFunction(event)
  }

  return (
    <div className={`outer-dropdown ${identifier}`}>
      <span className='selected-value'>{options[0]}</span>
      <span className='arrow' onClick={handleListActive}>
        <i className='fa fa-arrow-circle-o-down' aria-hidden='true' />
      </span>
      <span className='dropdown-list'>
        <ul onClick={handleOption}>
          {options.map((option, i) => {
            return <li key={i.toString()}>{option}</li>
          })}
        </ul>
      </span>
    </div>
  )
}
