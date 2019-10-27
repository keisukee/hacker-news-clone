import React from 'react'
import Article from './Article'
import queryString from 'query-string'

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

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      about: null,
      created: null,
      delay: null,
      id: null,
      karma: null,
      author: null,
      submitted: [],
      error: null
    }

  }
  componentDidMount() {
    console.log("search", this.props.location.search.id)
    const userId = queryString.parse(this.props.location.search).id
    fetch(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          about: data.about,
          created: new Date(data.created * 1000).toFormattedString(),
          delay: data.delay,
          id: data.id,
          karma: data.karma,
          author: userId,
          submitted: data.submitted,
          error: null
        })
        return data
      })
      .catch(() => {
        this.setState({
          error: `There was an error fetching the User.`
        })
        console.warn('Error fetching User: ', error)
    })
  }

  render() {
    return (
      <div>
        <h2 dangerouslySetInnerHTML={createMarkup(this.state.author)} />
        <ul className="flex-item">
          <li className="inline-item space-right">
            <p className="inline-item">
              <span className="color-gray space-right">joined</span>
              <span className="color-gray" dangerouslySetInnerHTML={createMarkup(this.state.created)} />
            </p>
          </li>
          <li className="inline-item space-right">
            <p className="inline-item">
              <span className="color-gray space-right">has</span>
              <span className="color-gray space-right">{this.state.karma}</span>
              <span className="color-gray space-right">karma</span>
            </p>
          </li>
        </ul>

        <div dangerouslySetInnerHTML={createMarkup(this.state.about)} />
        <div>
          <h2>Posts</h2>
          {this.state.submitted.length !== 0 && this.state.submitted.map((articleId) => (
            <div key={articleId}>
              <Article articleId={articleId} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}