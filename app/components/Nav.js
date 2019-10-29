import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default class Nav extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <div>
            <ul className='nav-container'>
              <li>
                <NavLink
                  exact
                  to='/'
                  activeStyle={activeStyle}
                  className='nav-link'>
                    Top
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/new'
                  activeStyle={activeStyle}
                  className='nav-link'>
                    New
                </NavLink>
              </li>
            </ul>
            <nav>
              <button
                style={{fontSize: 30}}
                activeStyle={activeStyle}
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