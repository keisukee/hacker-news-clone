import React from 'react'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

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

export default class PostInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      about: null,
      created: null,
      delay: null,
      id: null,
      karma: null,
      submitted: null,
      error: null
    }
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/user/${this.props.userId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          about: data.about,
          created: new Date(data.created * 1000).toFormattedString(),
          delay: data.delay,
          id: data.id,
          karma: data.karma,
          submitted: data.submitted,
          error: null
        })
        return data
      })
      .catch(() => {
        this.setState({
          error: `There was an error fetching the PostInfo.`
        })
        console.warn('Error fetching PostInfo: ', error)
    })
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div>
            <ul className="flex-item">
              <li className="inline-item">
                {this.props.userId &&
                  <p className="author inline-item">
                    <span className="color-gray space-right">by</span>
                    <Link
                      to={{
                        pathname: '/user',
                        search: `?id=${this.props.userId}`
                      }}>
                      <span className={`author-name author-name-${theme}`}>
                        {this.props.userId}
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
              <li className="inline-item">
                {this.props.comments.length !== 0 &&
                  <p className="inline-item">
                    <span className="color-gray space-right">with</span>
                    <Link
                      to={{
                        pathname: '/post',
                        search: `?id=${this.props.articleId}`
                      }}>
                        <span className={`space-right underline-${theme}`}>{this.props.comments.length}</span>
                    </Link>
                    <span className="color-gray">comments</span>
                  </p>
                }

              </li>
            </ul>
          </div>
        )}
      </ThemeConsumer>
    )
  }
}