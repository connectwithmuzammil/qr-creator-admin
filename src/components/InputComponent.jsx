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

export const InputCheckboxComponent = ({
  label,
  onChange,
  checked,
  ...props
}) => {
  return (
    // <div className="input-checkbox-comp">
    //   <input type="checkbox" onChange={onChange} {...props} />
    //   <label htmlFor="">{label}</label>
    // </div>

    <label className="checkbox-label">
      <input type="checkbox" checked={checked} onChange={onChange} {...props} />
      <span className="checkbox-custom"></span>
      {label}
    </label>
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
