import React from "react";
import ResumeForm from "./components/ResumeForm";
import Visualisation from "./components/Visualisation";
import AuthorizationForm, {
  RegistrationForm,
  LoginForm,
} from "./components/Authorization";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authView: "authorization",
      pdfBlob: null,
      preferencesKey: 0,
    };
  }

  handleSkip = () => {
    this.setState({ authView: null });
  };

  handleSwitchView = (view) => {
    this.setState({ authView: view });
  };

  renderAuthForm() {
    const { authView } = this.state;

    switch (authView) {
      case "authorization":
        return (
          <AuthorizationForm
            onSkip={this.handleSkip}
            onSwitch={this.handleSwitchView}
          />
        );
      case "register":
        return (
          <RegistrationForm
            onSkip={this.handleSkip}
            onSwitch={this.handleSwitchView}
          />
        );
      case "login":
        return (
          <LoginForm
            onSkip={this.handleSkip}
            onSwitch={this.handleSwitchView}
          />
        );
      default:
        return null;
    }
  }

  setPdfBlob = (blob) => {
    this.setState({ pdfBlob: blob });
  };

  resetPreferences = () => {
    this.setState((prevState) => ({
      preferencesKey: prevState.preferencesKey + 1,
    }));
  };

  render() {
    const { pdfBlob } = this.state;

    return (
      <div className="relative min-h-screen">
        <ResumeForm
          onSwitchView={this.handleSwitchView}
          onSkip={this.handleSkip}
          onLoginClick={() => this.handleSwitchView("login")}
          onRegisterClick={() => this.handleSwitchView("register")}
          setPdfBlob={this.setPdfBlob}
          preferencesKey={this.state.preferencesKey}
          resetPreferences={this.resetPreferences}
        />
        <Visualisation pdfBlob={pdfBlob} />

        {this.state.authView && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            {this.renderAuthForm()}
          </div>
        )}
      </div>
    );
  }
}

export default App;
