export const Filter = ({ handler }) => {
  return (
    <div>
      <span>Find contacts by name</span>
      <input
        onChange={handler}
        type="text"
        name="browser"
        title="Find contacts by name"
        required
      ></input>
    </div>
  );
};
