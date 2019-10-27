import React from 'react'
import Article from './Article'

export default class Top extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ids: [],
      info: null,
      error: null
    }

    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          ids: data.slice(0, 30),
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
    return this.state.error === null && this.state.ids.length === 0
  }

  render() {
    const { ids } = this.state
    return (
      <div>
        <div>
          {this.isLoading() && <p>LOADING</p>}
          {!this.isLoading() && ids.map((id) => (
            <div key={id}>
              <Article articleId={id} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}