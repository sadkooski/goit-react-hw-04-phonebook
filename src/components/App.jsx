import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (newName, newNumber) => {
    const existingContact = contacts.find(contact => contact.name === newName);

    if (existingContact) {
      alert(`${newName} is already in contacts.`);
      return;
    }

    const newContact = {
      name: newName,
      id: nanoid(),
      number: newNumber,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleBrowser = evt => {
    const filterValue = evt.target.value.toLowerCase();
    setFilter(filterValue);
  };

  const handleDelete = evt => {
    const button = evt.currentTarget;
    const name = button.name;
    const newContactsArr = contacts.filter(contact => contact.name !== name);
    setContacts(newContactsArr);
  };

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
      <ContactForm handler={handleSubmit} />
      <h2>Contacts</h2>
      <Filter handler={handleBrowser} />
      {contactsStatus > 0 &&
        filteredContacts.map(contact => (
          <ContactList
            key={contact.id}
            number={contact.number}
            name={contact.name}
            handler={handleDelete}
          />
        ))}
    </div>
  );
};

export default App;
