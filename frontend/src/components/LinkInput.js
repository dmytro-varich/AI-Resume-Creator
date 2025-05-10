import React, { forwardRef } from "react";

const LinkInput = forwardRef(
  ({ label, placeholder, icon, id, className }, ref) => {
    return (
      <div className={`link-input-container w-full ${className || ""}`}>
        <div className="icon-text">
          {icon}
          <span>{label}</span>
        </div>
        <input
          className="w-full"
          id={id}
          type="text"
          placeholder={placeholder}
          ref={ref}
        />
      </div>
    );
  }
);

export default LinkInput;
