import React from "react";
import Header from "./components/Header";
import Links from "./components/Links";
import Preferences from "./components/Preferences";
import Buttons from "./components/Buttons";
import { DownloadButtons } from "./components/Buttons";
import Account from "./components/Account"
import Resume from "./components/Resume";

class ResumeForm extends React.Component {
  render() {
    return (
      <div className="resume-form">
        <Account />
        <Header />
        <Links />
        <Preferences />
        <Buttons />
      </div>
    );
  }
}

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

class App extends React.Component {
  render() {
    return (
      <>
        <ResumeForm />
        <Visualisation />
      </>
    );
  }
}

export default App;
