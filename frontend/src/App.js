import React from "react";
import ResumeForm from "./components/ResumeForm";
import Visualisation from "./components/Visualisation";

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
