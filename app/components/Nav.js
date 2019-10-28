import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <div>
            <ul className='nav-container'>
              <li>
                <Link to='/' className='nav-link'>Top</Link>
              </li>
              <li>
                <Link to='/new' className='nav-link'>New</Link>
              </li>
            </ul>
            <nav>
              <button
                style={{fontSize: 30}}
                onClick={toggleTheme}
                className="btn-clear"
              >
                {theme === 'light' ? '🔦' : '💡'}
              </button>
            </nav>
          </div>


        )}
      </ThemeConsumer>
    )
  }
}