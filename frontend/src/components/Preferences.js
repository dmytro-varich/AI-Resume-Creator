import React from "react";
import TextareaAutosize from "react-textarea-autosize";

class Preferences extends React.Component {
  render() {
    return (
      <div className="preferences-container">
        <h2>Preferences</h2>
        <TextareaAutosize
          minRows={1}
          placeholder="Describe any additional details..."
          className="preferences-textarea"
          id='preferences-textarea'
        />
      </div>
    );
  }
}

export default Preferences;