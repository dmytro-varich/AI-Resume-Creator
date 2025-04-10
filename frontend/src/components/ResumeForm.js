import React, { createRef } from "react";
import Account from "./Account";
import Header from "./Header";
import Links from "./Links";
import Preferences from "./Preferences";
import Buttons from "./Buttons";

class ResumeForm extends React.Component {
  constructor(props) {
    super(props);
      this.linksRef = createRef(); 
      this.preferencesRef = createRef();
  }

  render() {
    return (
      <div className="resume-form">
        <Account />
        <Header />
        <Links ref={this.linksRef} />
        <Preferences ref={this.preferencesRef} />
        <Buttons linksRef={this.linksRef} preferencesRef={this.preferencesRef} />
      </div>
    );
  }
}

export default ResumeForm;