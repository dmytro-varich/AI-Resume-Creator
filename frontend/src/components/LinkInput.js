import React, { forwardRef } from "react";

const LinkInput = forwardRef(({ label, placeholder, icon, id }, ref ) => {
  return (
    <div className="link-input-container">
      <div className="icon-text">
        {icon}
        <span>{label}</span> 
      </div>
      <input id={id} type="text" placeholder={placeholder} ref={ref} />
    </div>
  );
});

export default LinkInput;
