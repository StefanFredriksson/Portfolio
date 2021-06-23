import React, { useState } from 'react'
import './Contact.css'
import { motion } from 'framer-motion'
import { pageTransition } from '../../../../Data'
import { validInputs } from './FormValidation'
import FlashMessage from './FlashMessage/FlashMessage'

export default function Contact () {
  const [flashState, setFlashState] = useState({
    show: false,
    message: ''
  })
  let timeout = null

  const click = async event => {
    clearTimeout(timeout)
    flashState.show = true
    const valid = validInputs()
    if (valid) {
      await submit()
    }
    flashState.message = valid ? 'Message sent!' : 'Message was not sent!'
    setFlashState({ ...flashState })

    timeout = setTimeout(() => {
      flashState.show = false
      setFlashState({ ...flashState })
    }, 5000)
  }

  const submit = async () => {
    const name = document.querySelector('#name-input')
    const email = document.querySelector('#email-input')
    const subject = document.querySelector('#subject-input')
    const message = document.querySelector('#message-input')

    const data = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value
    }

    const response = await window.fetch(
      'http://localhost:8000/portfolio/message',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
  }

  return (
    <motion.div
      id='main-contact-container'
      initial='initial'
      animate='in'
      exit='out'
      variants={pageTransition.variants}
    >
      <FlashMessage state={flashState} />
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
          <button id='submit-btn' onClick={click}>
            SEND
          </button>
        </div>
      </div>
    </motion.div>
  )
}
