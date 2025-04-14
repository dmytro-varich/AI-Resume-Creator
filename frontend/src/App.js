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
      isLoading: false,
    };
  }

  handleSkip = () => {
    this.setState({ authView: null });
  };

  handleSwitchView = (view) => {
    this.setState({ authView: view });
  };

  setPdfBlob = (blob) => {
    this.setState({ pdfBlob: blob });
  };

  setIsLoading = (value) => {
    this.setState({ isLoading: value });
  };

  resetPreferences = () => {
    this.setState((prevState) => ({
      preferencesKey: prevState.preferencesKey + 1,
    }));
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

  render() {
    const { pdfBlob } = this.state;
    const { isLoading } = this.state;
    return (
      <div className="relative min-h-screen">
        <ResumeForm
          onSwitchView={this.handleSwitchView}
          onSkip={this.handleSkip}
          onLoginClick={() => this.handleSwitchView("login")}
          onRegisterClick={() => this.handleSwitchView("register")}
          setPdfBlob={this.setPdfBlob}
          setIsLoading={this.setIsLoading}
          isLoading={isLoading}
          preferencesKey={this.state.preferencesKey}
          resetPreferences={this.resetPreferences}
        />
        <Visualisation pdfBlob={pdfBlob} isLoading={isLoading} />

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
