import React from "react";

function Input({ type, id, labelName, handleInput, name, errors, value }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelName}
      </label>
      <input type={type} className="form-control" id={id} onChange={handleInput} name={name} value={value} />
      {id == "password" && togglePassword()}
      <ul>
        {errors.map((error, index) => {
          return (
            <li key={index} className="text-danger">
              {error}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
const togglePassword = () => {
  const handleChange = (e) => {
    if (document.querySelector("#password") != null) {
      const passwordInput = document.querySelector("#password");
      if (e.target.checked) {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }
  };
  return (
    <div>
      <div className="form-check mt-2">
        <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleChange} />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          show password
        </label>
      </div>
    </div>
  );
};
export default Input;
