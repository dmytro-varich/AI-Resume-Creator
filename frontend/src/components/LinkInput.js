import React, { forwardRef } from "react";

const LinkInput = forwardRef(({ label, placeholder, icon, id }, ref ) => {
  return (
    <div className="link-input-container w-full">
      <div className="icon-text">
        {icon}
        <span>{label}</span> 
      </div>
      <input className="w-4/5" id={id} type="text" placeholder={placeholder} ref={ref} />
    </div>
  );
});

export default LinkInput;
