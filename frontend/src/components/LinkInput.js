import React from "react";

const LinkInput = ({ label, placeholder, icon, id }) => {
  return (
    <div className="link-input-container">
      <div className="icon-text">
        {icon}
        <span>{label}</span> 
      </div>
      <input id={id} type="text" placeholder={placeholder} />
    </div>
  );
};



export default LinkInput;
