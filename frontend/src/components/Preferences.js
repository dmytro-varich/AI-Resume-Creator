import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const Preferences = forwardRef((props, ref) => {
  return (
    <div className="preferences-container">
      <h2>Preferences</h2>
      <TextareaAutosize
        key={props.preferencesKey}
        ref={ref}
        minRows={1}
        placeholder="Describe any additional details..."
        className="preferences-textarea"
        id="preferences-textarea"
      />
    </div>
  );
});

export default Preferences;
