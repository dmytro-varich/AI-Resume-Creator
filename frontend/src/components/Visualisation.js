import React from 'react';
import { DownloadButtons } from './Buttons';
import Resume from './Resume';

class Visualisation extends React.Component {
  render() {
    const { pdfBlob, isLoading, setIsPreviewResume, isPreviewResume } = this.props;

    return (
      <div className={this.props.className}>
        <DownloadButtons
          pdfBlob={pdfBlob}
          setIsPreviewResume={setIsPreviewResume}
        />
        <Resume
          pdfBlob={pdfBlob}
          isLoading={isLoading}
          isPreviewResume={isPreviewResume}
        />
      </div>
    );
  }
}

export default Visualisation;