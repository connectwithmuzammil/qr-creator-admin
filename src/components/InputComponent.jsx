export const InputComponent = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  defaultValue,
  disabled = false,
  // error,
  ...props
}) => {
  return (
    <div className="input-wrap-comp">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        {...props}
        // className={error ? "input-comp-error" : ""}
      />
      {/* {error && <span className="error-message-input-comp">{error}</span>} */}
     
    </div>
  );
};
export const InputCheckboxComponent = ({ label, ...props }) => {
  return (
    <div className="input-checkbox-comp">
      <input type="checkbox" {...props} />
      <label htmlFor="">{label}</label>
    </div>
  );
};

export const InputSelectComponent = ({
  label,
  name,
  value,
  onChange,
  options,
  defaultOption = "Select an option",
  ...props
}) => {
  return (
    <div className="select-wrap-comp">
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        <option value="" disabled>
          {defaultOption}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
