const Input = ({ handleChange, value, title, name, id, color }) => {
  return (
    <label className="sidebar-label-container">
      <input
        onChange={handleChange}
        type="checkbox"
        value={value}
        name={name}
        id={id}
      />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default Input;
