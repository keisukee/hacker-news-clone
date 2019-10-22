import React from 'react'

export default class Contacts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: []
    }
    this.getContacts = this.getContacts.bind(this)
  }
  getContacts() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      console.log("data: ", data)
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  render() {
    const { contacts } = this.state

    return (
      <div>
        <button onClick={() => this.getContacts()}>get contacts</button>
        <div>
          <center><h1>Contact List</h1></center>
          {contacts.map((contact) => (
            <div className="card" key={contact.name}>
              <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{contact.email}</h6>
                <p className="card-text">{contact.company.catchPhrase}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}