import React from 'react'
import { Link } from 'react-router-dom'

function createMarkup(state) {
  return {__html: state};
}
String.prototype.padLeft = function (length, character) {
  return new Array(length - this.length + 1).join(character || ' ') + this; 
}

Date.prototype.toFormattedString = function () {
  return [String(this.getMonth()+1).padLeft(2, '0'),
          String(this.getDate()).padLeft(2, '0'),
          String(this.getFullYear()).substr(2, 2)].join("/") + " " +
          [String(this.getHours()).padLeft(2, '0'),
          String(this.getMinutes()).padLeft(2, '0')].join(":")
}

export default class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      author: null,
      id: null,
      created: null,
      text: null,
      type: null
    }
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.commentId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          author: data.by,
          id: data.id,
          created: new Date(data.time * 1000).toFormattedString(),
          text: data.text
        })
        console.log("comment:", data)
        return data
      })
      .catch(() => {
        console.warn('Error fetching articles')
      })
  }

  render() {
    return (
      <div className="card">
        <ul className="flex-item">
          <li className="inline-item">
            {this.state.author &&
              <p className="author inline-item">
                <span className="color-gray space-right">by</span>
                <Link
                  to={{
                    pathname: '/user',
                    search: `?id=${this.state.author}`
                  }}>
                  <span className="author-name">
                    {this.state.author}
                  </span>
                </Link>
              </p>
            }
          </li>
          <li className="inline-item">
            <p className="inline-item">
              <span className="color-gray space-right">on</span>
              <span className="color-gray" dangerouslySetInnerHTML={createMarkup(this.state.created)} />
            </p>
          </li>
        </ul>

        <div dangerouslySetInnerHTML={createMarkup(this.state.text)} />
      </div>
    )
  }
}