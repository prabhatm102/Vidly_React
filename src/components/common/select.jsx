import React from "react";

const Select = ({ label, name, options, error, ...rest }) => {
  return (
    <div className="form-group col">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} className="form-control" {...rest}>
        <option value="">Please Select</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  id: "",
};

export default Select;
