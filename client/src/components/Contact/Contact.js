import React from 'react'
import './Contact.css'
import { motion } from 'framer-motion'
import { pageTransition } from '../../Data'

export default function Contact () {
  return (
    <motion.div
      id='main-contact-container'
      initial='initial'
      animate='in'
      exit='out'
      variants={pageTransition.variants}
    >
      <div id='inner-contact-container'>
        <div id='input-container'>
          <span id='name-email-container'>
            <span className='input'>
              <input type='text' id='name-input' placeholder='Name' />
              <span />
            </span>
            <span className='input'>
              <input type='email' id='email-input' placeholder='Email' />
              <span />
            </span>
          </span>
          <span id='subject-container'>
            <span className='input'>
              <input type='text' id='subject-input' placeholder='Subject' />
              <span />
            </span>
          </span>
        </div>

        <div id='message-container'>
          <span className='input'>
            <textarea id='message-input' placeholder='Message' />
            <span />
          </span>
        </div>
        <div id='btn-container'>
          <button id='submit-btn'>SEND</button>
        </div>
      </div>
    </motion.div>
  )
}
