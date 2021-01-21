import './App.css'
import Nav from './components/Nav/Nav'
import Content from './components/Content/Content'
import { BrowserRouter as Router } from 'react-router-dom'

function App () {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Content />
      </div>
    </Router>
  )
}

export default App
