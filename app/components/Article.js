import React from 'react'
import User from './User'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import PostInfo from './PostInfo'
import { ThemeConsumer } from '../contexts/theme'

export default class Article extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: [],
      isDeleted: false,
      author: null,
      title: null,
      url: null,
      comments: [],
      type: null,
      error: null
    }

    this.isLoading = this.isLoading.bind(this)
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.articleId}.json`)
      .then(res => res.json())
      .then((data) => {
        console.log("data.deleted", data.deleted || false)
        this.setState({
          author: data.by,
          isDeleted: data.deleted || false,
          title: data.title,
          url: data.url,
          comments: data.kids || [],
          type: data.type,
          error: null
        })
        return data

      })
      .catch(() => {
        this.setState({
          error: `There was an error fetching the repositories.`
        })
        console.warn('Error fetching article: ', error)
      })
  }

  isLoading() {
    return this.state.error === null && this.state.author === null
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div>
            {this.isLoading() && <p>LOADING</p>}
            {this.state.isDeleted === false && this.state.type === "story" && !this.isLoading() && <p>LOADING</p> &&
              <div>
                {this.state.title &&
                  <h2 className={`title-${theme}`}>
                    <a href={this.state.url} target="_blank">{this.state.title}</a>
                  </h2>
                }
                {<PostInfo userId={this.state.author} comments={this.state.comments} articleId={this.props.articleId} />}
              </div>
            }
          </div>
        )}
      </ThemeConsumer>
    )
  }
}