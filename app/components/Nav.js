import React from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/' className='nav-link'>Top</Link>
          </li>
          <li>
            <Link to='/new' className='nav-link'>New</Link>
          </li>
        </ul>
      </div>
    )
  }
}