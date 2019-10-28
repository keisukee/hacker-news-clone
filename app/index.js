import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import Nav from './components/Nav'
import New from './components/New'
import Top from './components/Top'
import Post from './components/Post'
import User from './components/User'
import { ThemeProvider } from './contexts/theme'


import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }
  render() {
    console.log("theme: ", this.state.theme)
    return (
      <ThemeProvider value={this.state}>
        <Router>
          <div>
            <Nav />
            <Route exact path='/' component={Top}></Route>
            <Route path='/new' component={New}></Route>
            <Route path='/post' component={Post}></Route>
            <Route path='/user' component={User}></Route>
          </div>
        </Router>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)