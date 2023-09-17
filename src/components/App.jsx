import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };
  }

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      this.setState({ contacts: storedContacts });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleSubmit = evt => {
    evt.preventDefault();

    const { contacts } = this.state;
    const form = evt.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const existingContact = contacts.find(contact => contact.name === name);

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name: name,
      id: nanoid(),
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));

    form.reset();
  };

  handleBrowser = evt => {
    const filterValue = evt.target.value.toLowerCase();
    this.setState({ filter: filterValue });
  };

  handleDelete = evt => {
    const button = evt.currentTarget;
    const name = button.name;
    const { contacts } = this.state;
    const newContactsArr = contacts.filter(contact => contact.name !== name);

    this.setState({
      contacts: newContactsArr,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    const contactsStatus = filteredContacts.length;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handler={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter handler={this.handleBrowser} />
        {contactsStatus > 0 &&
          filteredContacts.map(contact => (
            <ContactList
              key={contact.id}
              number={contact.number}
              name={contact.name}
              handler={this.handleDelete}
            />
          ))}
      </div>
    );
  }
}

export default App;
