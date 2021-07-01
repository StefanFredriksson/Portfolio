import React, { useEffect, useContext } from 'react'
import './SplashScreen.css'
import { StateContext } from '../../../Store'

const wait = (duration = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, duration)
  })
}

const style = {
  transform: 'scale(0) translate(100px, 100px)'
}

export default function SplashScreen ({ setSplash }) {
  const [state, setState] = useContext(StateContext)
  useEffect(async () => {
    const text = document.querySelector('#app-splash-text')
    const spans = text.querySelectorAll('span')
    await wait()
    for (const span of spans) {
      span.style.transform = ''
      await wait(100)
    }
    for (const span of spans) {
      span.style.transition = '1.5s'
    }
    await wait(2000)
    for (const span of spans) {
      span.style.transform = 'translateY(2000px)'
      await wait(100)
    }
    await wait(500)
    state.firstTime = false
    setState({ ...state })
    setSplash(false)
  }, [])
  return (
    <div id='app-splash-screen-container'>
      <div id='app-splash-text'>
        <span style={style}>H</span>
        <span style={style}>e</span>
        <span style={style}>l</span>
        <span style={style}>l</span>
        <span style={style}>o</span>
        <span style={style}>,</span>
        &nbsp;&nbsp;&nbsp;
        <span style={style}>w</span>
        <span style={style}>e</span>
        <span style={style}>l</span>
        <span style={style}>c</span>
        <span style={style}>o</span>
        <span style={style}>m</span>
        <span style={style}>e</span>
        &nbsp;&nbsp;&nbsp;
        <span style={style}>t</span>
        <span style={style}>o</span>
        &nbsp;&nbsp;&nbsp;
        <span style={style}>m</span>
        <span style={style}>y</span>
        &nbsp;&nbsp;&nbsp;
        <span style={style}>w</span>
        <span style={style}>e</span>
        <span style={style}>b</span>
        <span style={style}>s</span>
        <span style={style}>i</span>
        <span style={style}>t</span>
        <span style={style}>e</span>
        <span style={style}>!</span>
      </div>
    </div>
  )
}
