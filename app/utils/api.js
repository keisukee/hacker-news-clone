export function getLatestNewsIds() {
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/topstories.json`)

  return fetch(endpoint)
    .then((response) => {
      console.log("response: ", response.json())
      response.json()
    })
    .then((ids) => {
      // if (!ids) {
      //   throw new Error(ids.message)
      // }
      for(let i = 0; i < ids.length; i++) {
        console.log(ids[i])
      }

      return ids
    })
}

export function getNews(id) {
  // const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/21305376.json`)

  return fetch(endpoint)
    .then((response) => {
      console.log("response: ", response)
      response.json()
    })
    .then((data) => {
      return data
    })
}
