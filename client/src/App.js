import './App.css'
import './common.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Apps from './Apps/Apps'

function App () {
  return (
    <Router>
      <div className='App'>
        <Apps />
      </div>
    </Router>
  )
}

export default App
