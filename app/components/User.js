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

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      about: null,
      created: null,
      delay: null,
      id: null,
      karma: null,
      submitted: null
    }

  }
  componentDidMount() {
    // console.log("mount: ", this.props)
    fetch(`https://hacker-news.firebaseio.com/v0/user/${this.props.userId}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          about: data.about,
          // created: data.created,
          created: new Date(data.created * 1000).toFormattedString(),
          delay: data.delay,
          id: data.id,
          karma: data.karma,
          submitted: data.submitted
        })
        // console.log("data: ", data)
        return data
      })
      .catch(() => {
        console.warn('Error fetching articles')
      })
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={createMarkup(this.state.about)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.created)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.author)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.id)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.karma)} />
        <div dangerouslySetInnerHTML={createMarkup(this.state.submitted)} />
      </div>
    )
  }
}