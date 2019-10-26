import React from 'react'

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
      by: null,
      id: null,
      text: null,
      type: null
    }
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.commentId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          by: data.by,
          id: data.id,
          text: data.text
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
        <div dangerouslySetInnerHTML={createMarkup(this.state.by)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.id)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.text)} />
      </div>
    )
  }
}