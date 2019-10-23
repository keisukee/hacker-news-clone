import React from 'react'

export default class Article extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: [],
      author: null,
      title: null
    }

  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.articleId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          author: data.by,
          title: data.title
        })
        console.log("data: ", data)
        return data
      })
      .catch(console.log("error"))
  }

  render() {
    console.log("props: ", this.props)
    console.log("state: ", this.state)
    return (
      <div>
        <span>{this.state.articleId}</span>
        <h2 className="title">{this.state.title}</h2>
        <p className="author">by {this.state.author}</p>
      </div>
    )
  }
}