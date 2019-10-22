import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import New from './components/New'
import Top from './components/Top'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          Hello World!
          <Nav />

          <Route exact path='/' component={Top}></Route>
          <Route path='/new' component={New}></Route>
        </div>

      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)