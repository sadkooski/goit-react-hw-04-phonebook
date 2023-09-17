export const ContactList = ({ name, number, handler }) => {
  return (
    <div>
      <ul>
        <li>
          {name} {number}
        </li>
        <button onClick={handler} name={name}>
          Delete
        </button>
      </ul>
    </div>
  );
};
