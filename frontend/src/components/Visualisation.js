import React from 'react';
import { DownloadButtons } from './Buttons';
import Resume from './Resume';

class Visualisation extends React.Component {
  render() {
    const { pdfBlob, isLoading } = this.props;

    return (
      <div className="resume-visualization">
        <DownloadButtons pdfBlob={pdfBlob} />
        <Resume pdfBlob={pdfBlob} isLoading={isLoading} />
      </div>
    );
  }
}

export default Visualisation;