import React from 'react'

export default class Article extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: []
    }
  }

  render() {
    return (
      <div>
        <h2 className="title">{this.props.title}</h2>
        <p className="author">by {this.props.author}</p>
      </div>
    )
  }
}