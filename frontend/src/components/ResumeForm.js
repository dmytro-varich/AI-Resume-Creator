import React, { createRef } from "react";
import Account from "./Account";
import Header from "./Header";
import Links from "./Links";
import Preferences from "./Preferences";
import Buttons, { PreviewButton } from "./Buttons";

class ResumeForm extends React.Component {
  constructor(props) {
    super(props);
    this.linksRef = createRef();
    this.preferencesRef = createRef();
  }
  
  render() {
    const { onLoginClick, onRegisterClick, preferencesKey, resetPreferences } =
      this.props;
    return (
      <div className={this.props.className}>
        <Account
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
        <Header />
        <Links ref={this.linksRef} />
        <Preferences ref={this.preferencesRef} key={preferencesKey} />
        <Buttons
          linksRef={this.linksRef}
          preferencesRef={this.preferencesRef}
          setPdfBlob={this.props.setPdfBlob}
          setIsLoading={this.props.setIsLoading}
          isLoading={this.props.isLoading}
          resetPreferences={resetPreferences}
        />
        <PreviewButton setIsPreviewResume={this.props.setIsPreviewResume} />
      </div>
    );
  }
}

export default ResumeForm;
