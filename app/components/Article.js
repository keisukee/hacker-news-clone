import React from 'react'
import User from './User'

export default class Article extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: [],
      author: null,
      title: null,
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
    // console.log("article: ", this.state.author)
    return (
      <div>
        {this.isLoading() && <p>LOADING</p>}
        {!this.isLoading() && <User userId={this.state.author} />}
        <span>{this.state.articleId}</span>
        <h2 className="title">{this.state.title}</h2>
        <p className="author">by {this.state.author}</p>
      </div>
    )
  }
}