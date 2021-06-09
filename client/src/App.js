import './App.css'
import './common.css'
import Nav from './components/Nav/Nav'
import Content from './components/Content/Content'
import { BrowserRouter as Router } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { StateContext } from './Store'
import './Interactive.css'

function App () {
  const [state] = useContext(StateContext)

  useEffect(() => {}, [])
  return (
    <Router>
      <div className='App'>
        <style>
          {`:root {
          --main-color: ${state.color};
          --nav-width: ${state.navWidth}px;
        }`}
        </style>

        <Nav />
        <Content />
      </div>
    </Router>
  )
}

export default App
