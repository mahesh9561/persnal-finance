import React from "react";

function Button({ className, onClick, text }) {
  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
