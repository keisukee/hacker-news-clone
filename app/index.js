import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import Nav from './components/Nav'
import New from './components/New'
import Top from './components/Top'
import Post from './components/Post'
import User from './components/User'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path='/' component={Top}></Route>
          <Route path='/new' component={New}></Route>
          <Route path='/post' component={Post}></Route>
          <Route path='/user' component={User}></Route>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)