import React from 'react'
import './Nav.css'
import { withRouter, Link } from 'react-router-dom'
import { endpoints } from '../../Data'
import HomeIcon from '../Icons/Home/Home'
import AboutIcon from '../Icons/About/About'
import SkillsIcon from '../Icons/Skills/Skills'
import WorkIcon from '../Icons/Work/Work'
import ContactIcon from '../Icons/Contact/Contact'

function Nav (props) {
  const styling = {
    stroke: 'grey',
    active: 'cyan',
    sWidth: '2'
  }

  const path = window.location.pathname.replace('/', '')

  return (
    <div id='navigation-container'>
      <div id='info-container'>
        <Link to={`/${endpoints.home}`}>
          <HomeIcon
            stroke={path === endpoints.home ? styling.active : styling.stroke}
            sWidth={styling.sWidth}
          />
        </Link>
        <Link to={`/${endpoints.about}`}>
          <AboutIcon
            stroke={path === endpoints.about ? styling.active : styling.stroke}
            sWidth={styling.sWidth}
          />
        </Link>
        <Link to={`/${endpoints.skills}`}>
          <SkillsIcon
            stroke={path === endpoints.skills ? styling.active : styling.stroke}
            sWidth={styling.sWidth}
          />
        </Link>
        <Link to={`/${endpoints.work}`}>
          <WorkIcon
            stroke={path === endpoints.work ? styling.active : styling.stroke}
            sWidth={styling.sWidth}
          />
        </Link>
        <Link to={`/${endpoints.contact}`}>
          <ContactIcon
            stroke={
              path === endpoints.contact ? styling.active : styling.stroke
            }
            sWidth={styling.sWidth}
          />
        </Link>
      </div>
    </div>
  )
}

export default withRouter(Nav)
