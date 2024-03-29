import React from "react";

function Input({ label, placeholder, state, setState, className,type }) {
  return (
    <div>
      <label>{label}</label>
      <input
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className={className}
        type={type}
      />
    </div>
  );
}

export default Input;
