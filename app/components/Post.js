import React from 'react'
import Comment from './Comment'

export default class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      by: null,
      id: null,
      text: null,
      type: null,
      commentIds: []
    }
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.postId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          by: null,
          id: null,
          text: null,
          type: null
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
        <p>aaaaa</p>
        {/* <div dangerouslySetInnerHTML={createMarkup(this.state.about)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.created)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.author)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.id)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.karma)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.submitted)} /> */}
      </div>
    )
  }
}