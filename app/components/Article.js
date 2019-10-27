import React from 'react'
import User from './User'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import PostInfo from './PostInfo'

export default class Article extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: [],
      author: null,
      title: null,
      url: null,
      comments: [],
      error: null
    }

    this.isLoading = this.isLoading.bind(this)
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.articleId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          author: data.by,
          title: data.title,
          url: data.url,
          comments: data.kids || [],
          error: null
        })
        return data
      })
      .catch(() => {
        console.warn('Error fetching article: ', error)

        this.setState({
          error: `There was an error fetching the repositories.`
        })
      })
  }

  isLoading() {
    return this.state.error === null && this.state.author === null
  }

  render() {
    return (
      <div>
        {this.isLoading() && <p>LOADING</p>}
        {this.state.title &&
          <h2 className="title">
            <a href={this.state.url} target="_blank">{this.state.title}</a>
          </h2>
        }
        {/* {this.state.author &&
          <div className="author">
            <p>
              <span className="space-right">by</span>
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
          </div>
        } */}
        {!this.isLoading() && <PostInfo userId={this.state.author} comments={this.state.comments} articleId={this.props.articleId} />}
        {/* {this.state.comments.length !== 0 &&
          <p>
            <Link
              to={{
                pathname: '/post',
                search: `?id=${this.props.articleId}`
              }}>
              comment {this.state.comments.length}
            </Link>
          </p>
        } */}
      </div>
    )
  }
}