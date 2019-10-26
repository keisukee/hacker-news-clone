import React from 'react'
import User from './User'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

export default class Article extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: [],
      author: null,
      title: null,
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
    console.log("article: ", this.state.comments)
    return (
      <div>
        {this.isLoading() && <p>LOADING</p>}
        {!this.isLoading() && <User userId={this.state.author} />}
        <span>articleId: {this.props.articleId}</span>
        <h2 className="title">{this.state.title}</h2>
        <p className="author">by {this.state.author}</p>
        {this.state.comments.length !==  0 &&
          <p>
            <Link
              className='nav-link'
              to={{
                pathname: '/post',
                search: `?id=${this.props.articleId}`
              }}>
              comment {this.state.comments.length}
            </Link>
          </p>
        }
      </div>
    )
  }
}