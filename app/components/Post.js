import React from 'react'
import Comment from './Comment'
import queryString from 'query-string'

export default class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      author: null,
      title: null,
      id: null,
      type: null,
      commentIds: []
    }
  }
  componentDidMount() {
    const postId = queryString.parse(this.props.location.search).id
    console.log(postId)
    fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          author: data.by,
          title: data.title,
          id: postId,
          type: null,
          commentIds: data.kids
        })
        return data
      })
      .catch(() => {
        console.warn('Error fetching articles')
      })
  }

  render() {
    return (
      <div>
        <span>articleId: {this.props.id}</span>
        <h2 className="title">{this.state.title}</h2>
        <p className="author">by {this.state.author}</p>
        {this.state.commentIds.length != 0 && this.state.commentIds.map((id) => (
          <Comment key={id} commentId={id} />
        ))}

      </div>
    )
  }
}