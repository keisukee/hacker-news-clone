import React from 'react'
// import { getLatestNewsIds, getNews } from '../utils/api'
import Contacts from './Contacts';

export default class New extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ids: []
    }

    this.gatherNewsIds = this.gatherNewsIds.bind(this)
    this.getNews = this.getNews.bind(this)
    // this.gatherNewsIds = this.gatherNewsIds.bind(this)
    // this.showNews = this.showNews.bind(this)
  }
  gatherNewsIds() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(res => res.json())
    .then((data) => {
      this.setState({ ids: data })
    })
    .catch(console.log)
  }

  getNews(id) {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then(res => res.json())
    .then((data) => {
      console.log("data: ", data)
    })
    .catch(console.log("error: ", data))
  }

  render() {
    const { ids } = this.state
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
            </div>

          ))}
        </div>
      </div>
    )
  }
}