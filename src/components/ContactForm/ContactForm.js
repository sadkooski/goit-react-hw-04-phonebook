import React, { useState } from 'react';

export const ContactForm = ({ handler }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = evt => {
    const form = evt.currentTarget;
    console.log(form.name);

    if (form.name === 'name') {
      setName(form.value);
    } else {
      setNumber(form.value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    handler(name, number);
  };

  return (
    <form onSubmit={onSubmit}>
      <span>Name</span>
      <input
        id="inputs"
        onChange={onChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <span>Number</span>
      <input
        id="inputs"
        onChange={onChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};
