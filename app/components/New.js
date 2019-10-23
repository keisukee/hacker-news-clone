import React from 'react'
import Contacts from './Contacts';
import Article from './Article'

export default class New extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ids: [],
      info: null
    }

    this.gatherNewsIds = this.gatherNewsIds.bind(this)
    this.getNews = this.getNews.bind(this)
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ ids: data })
        console.log("aaa: ", data)
        return data
      })
      .catch(console.log)
  }

  gatherNewsIds() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({ ids: data })
        console.log("aaa: ", data)
        return data
      })
      .catch(console.log)

  }

  getNews(id) {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(res => res.json())
      .then((data) => {
        this.setState({ info: data })
        console.log("data: ", data)
        return data
      })
      .catch(console.log("error"))
  }

  render() {
    const { ids, info } = this.state
    return (
      <div>
        new
        <Contacts />
        <button onClick={() => this.gatherNewsIds()}>gatherNewsIds</button>
        <div>
          {ids.map((id) => (
            <div key={id}>
              <span>{id}</span>
              <button onClick={() => this.getNews(id)}>show news</button>
              <Article articleId={id} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}