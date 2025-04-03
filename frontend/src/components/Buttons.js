import React from 'react';

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons-container">
        <button className="generate-resume">Generate Resume</button>
        <button className="reset-parameters">Reset Parameters</button>
      </div>
    );
  }
}

class DownloadButtons extends React.Component {
  render() {
    return (
      <div className="download-buttons">
        <button className="download-pdf">Download PDF</button>
        <button className="download-formats">...</button>
      </div>
    );
  }
}

export default Buttons;
export { DownloadButtons };