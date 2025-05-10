import { useState, useEffect } from "react";
import { Card, Checkbox, Button, Typography } from "@material-tailwind/react";
import { SuccessAlert } from "./Alert";

const backendUrl =
  window.runtimeConfig?.REACT_APP_BACKEND_URL || "http://localhost:8080";

export function RegistrationForm({ onSkip, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isAlertActive, setIsAlertActive] = useState(false);
    const [alertTitleMessage, setAlertTitleMessage] = useState(null);
    const [alertDescMessage, setAlertDescMessage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
  
    // function to set alert message and visibility
    const showAlert = (title, description) => {
      if (isAlertActive) return;
      setIsAlertActive(true);
      setAlertTitleMessage(title);
      setAlertDescMessage(description);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAlertActive(false);
      }, 3000);
    };

  const validate = () => {
    const newErrors = {};
    if (!name.trim())
      newErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format.";
    if (password.trim().length < 6) newErrors.password = "Password must be at least 6 symbols.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(`${backendUrl}/api/Account/CreateAccountAsync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        if (response.ok) {
          console.log("Account created successfully!");
          localStorage.setItem("user", JSON.stringify({ name, email }));
          console.log("Account created and data saved to localStorage.");
          showAlert(
            "Account created successfully!",
            "You can now log in to your account."
          );
          setTimeout(() => {
            onSkip();
          }, 1000);
          window.location.reload();
        } else {
          console.error("Error creating account:", response.statusText);
          console.log("Response:", (await response).json());
          setErrors((prev) => ({
            ...prev,
            email: "Email already exists.",
          }));
        }
      } catch (error) {
        console.error("Error:", error);
        setErrors((prev) => ({
          ...prev,
          email: "An error occurred. Please try again.",
        }));
      }
    }
  };

  const getInputClass = (field) =>
    `w-full ${
      errors[field]
        ? "bg-red-900 border-red-500 focus:bg-[#363636]"
        : "bg-[#363636] border-[#686868]"
    } outline-none text-white placeholder-[#686868] border rounded-lg py-[10px] px-[10px] focus:border-white`;

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Card className="auth-window bg-[#1e1e1e] rounded-2xl p-6 w-[400px] shadow-lg">
      <Typography variant="h3" className="text-white font-bold">
        Get Started
      </Typography>
      <Typography className="text-gray-400 mt-1">
        Create your own account
      </Typography>

      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSignUp}>
        <div>
          <input
            type="text"
            placeholder="Your Name"
            className={getInputClass("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => handleFocus("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 mb-0">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="example@mail.com"
            className={getInputClass("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFocus("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 mb-0">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={getInputClass("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 mb-0">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            ripple={false}
            className="h-4 w-4 red-checkbox"
            containerProps={{ className: "p-0" }}
          />
          <Typography variant="small" className="text-gray-400 mb-0">
            I agree to the{" "}
            <a href="www.google.com" className="underline hover:text-white">
              Terms and Privacy Policy.
            </a>
          </Typography>
        </div>

        <Button
          type="submit"
          className="mt-1 bg-white text-black font-semibold rounded-lg py-2 hover:bg-[#e3e3e3] transition"
        >
          Sign Up
        </Button>

        <Typography className="text-center text-sm text-gray-400 mt-2 mb-2">
          Already have an account?{" "}
          <span
            className="text-white font-medium hover:underline cursor-pointer"
            onClick={() => onSwitch("login")}
          >
            Sign In
          </span>{" "}
          or{" "}
          <span
            className="text-white font-medium hover:underline cursor-pointer"
            onClick={onSkip}
          >
            Don’t Enter
          </span>
        </Typography>
      </form>
      {alertTitleMessage && alertDescMessage && (
        <div className={`alert-container ${isVisible ? "show" : "hide"}`}>
          <SuccessAlert
            title={alertTitleMessage}
            description={alertDescMessage}
          />
        </div>
      )}
    </Card>
  );
}

export function LoginForm({ onSkip, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertTitleMessage, setAlertTitleMessage] = useState(null);
  const [alertDescMessage, setAlertDescMessage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (title, description) => {
    if (isAlertActive) return;
    setIsAlertActive(true);
    setAlertTitleMessage(title);
    setAlertDescMessage(description);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAlertActive(false);
    }, 3000);
  };

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(
          `${backendUrl}/api/Account/VerifyPasswordAsync`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "user", email, password }),
          }
        );
        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem(
            "user",
            JSON.stringify({ name: userData.name, email: userData.email })
          );

          showAlert("Login successful!", "Welcome back.");
          setTimeout(() => {
            onSkip();
          }, 1000);
          window.location.reload();
        } else {
          const result = await response.json();
          setErrors((prev) => ({
            ...prev,
            password: result.message || "Incorrect email or password.",
          }));
        }
      } catch (err) {
        console.error("Login error:", err);
        setErrors((prev) => ({
          ...prev,
          email: "An error occurred. Try again.",
        }));
      }
    }
  };

  const getInputClass = (field) =>
    `w-full ${
      errors[field]
        ? "bg-red-900 border-red-500 focus:bg-[#363636]"
        : "bg-[#363636] border-[#686868]"
    } outline-none text-white placeholder-[#686868] border rounded-lg py-[10px] px-[10px] focus:border-white`;

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Card className="auth-window bg-[#1e1e1e] rounded-2xl p-6 w-[400px] shadow-lg">
      <Typography variant="h3" className="text-white font-bold">
        Welcome Back
      </Typography>
      <Typography className="text-gray-400 mt-1">
        Sign in to your account
      </Typography>

      <form className="mt-4 flex flex-col gap-4" onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="example@mail.com"
            className={getInputClass("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFocus("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 mb-0">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={getInputClass("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 mb-0">{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-1 bg-white text-black font-semibold rounded-lg py-2 hover:bg-[#e3e3e3] transition"
        >
          Sign In
        </Button>

        <Typography className="text-center text-sm text-gray-400 mt-2 mb-2">
          Don’t have an account?{" "}
          <span
            className="text-white font-medium hover:underline cursor-pointer"
            onClick={() => onSwitch("register")}
          >
            Sign Up
          </span>{" "}
          or{" "}
          <span
            className="text-white font-medium hover:underline cursor-pointer"
            onClick={onSkip}
          >
            Don’t Enter
          </span>
        </Typography>
      </form>

      {alertTitleMessage && alertDescMessage && (
        <div className={`alert-container ${isVisible ? "show" : "hide"}`}>
          <SuccessAlert
            title={alertTitleMessage}
            description={alertDescMessage}
          />
        </div>
      )}
    </Card>
  );
}

export function AuthorizationForm({ onSkip, onSwitch }) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      onSkip();
    }
  }, [onSkip]);
  return (
    <Card className="auth-window bg-[#1e1e1e] rounded-2xl p-6 w-[380px] shadow-lg">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-white text-3xl font-bold">Welcome!</h2>
        <p className="text-gray-400 mt-2 text-sm w-3/4 text-center">
          Log in, sign up, or continue without signing in to get the opportunity
          for AI-powered resume generation.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        <Button
          onClick={() => onSwitch("login")}
          className="bg-white text-black font-semibold rounded-full py-2 hover:bg-[#e3e3e3] transition"
        >
          Log in
        </Button>

        <Button
          onClick={() => onSwitch("register")}
          className="border border-white text-white font-semibold rounded-full py-2 hover:bg-[#343434] transition"
        >
          Sign up
        </Button>

        <Button
          onClick={onSkip}
          className="text-white text-sm underline hover:text-gray-300 transition"
        >
          Don't Enter
        </Button>
      </div>
    </Card>
  );
}
export default AuthorizationForm;
