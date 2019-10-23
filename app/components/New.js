import React from 'react'
import Article from './Article'

export default class New extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ids: [],
      info: null
    }

  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ ids: data })
        console.log("aaa: ", data)
        return data
      })
      .catch(console.log)
  }

  render() {
    const { ids, info } = this.state
    return (
      <div>
        new
        <div>
          {ids.map((id) => (
            <div key={id}>
              <span>{id}</span>
              <Article articleId={id} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}