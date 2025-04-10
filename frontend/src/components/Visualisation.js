import React from 'react';
import { DownloadButtons } from './Buttons';
import Resume from './Resume';

class Visualisation extends React.Component {
  render() {
    return (
      <div className="resume-visualization">
        <DownloadButtons />
        <Resume />
      </div>
    );
  }
}

export default Visualisation;