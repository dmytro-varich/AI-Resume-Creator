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
      authView: "authorization", // 'authorization' | 'register' | 'login' | null
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

  render() {
    return (
      <div className="relative min-h-screen">
        <ResumeForm />
        <Visualisation />

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
