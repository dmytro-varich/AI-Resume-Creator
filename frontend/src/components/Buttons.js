import React, { useState } from "react";
import CustomAlert from "./Alert";

const backendUrl = window.BACKEND_URL || "http://localhost:8000";

const Buttons = ({ linksRef, preferencesRef }) => {
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

  // function to validate profile links
  const isValidProfileLink = (url, platform) => {
    try {
      if (!url) return false;
      console.log("Validating URL:", url);
      console.log("Platform:", platform);
      if (platform === "linkedin") {
        console.log("Validating LinkedIn URL:", url);
        const regex =
          /^(https?:\/\/)?(www\.)?(linkedin\.com\/in\/[a-zA-Z0-9-]+)/;
        return regex.test(url);
      }
      if (platform === "github") {
        const regex = /^(https?:\/\/)?(www\.)?(github\.com\/[a-zA-Z0-9-]+)/;
        return regex.test(url);
      }
    } catch (error) {
      return false;
    }
  };

  // function to handle resume generation
  const handleGenerateResume = async () => {
    console.log("Generate Resume button clicked");

    const formData = {
      linkedin: linksRef.current?.linkedin?.value.trim() || "",
      github: linksRef.current?.github?.value.trim() || "",
      preferences: preferencesRef.current?.value.trim() || "",
    };

    console.log("Form data:", formData);

    // Check if filled correctly fields
    if (!formData.linkedin && !formData.github && !formData.preferences) {
      showAlert(
        "Please fill in at least one field.",
        "You have fields to enter links to your GitHub and LinkedIn profiles, as well as an additional field for specifying preferences for your resume. Please fill in at least one of these fields to proceed. This will help us create your resume!"
      );
      return;
    }

    // Check if URLs are valid
    if (
      !isValidProfileLink(formData.linkedin, "linkedin") &&
      formData.linkedin
    ) {
      showAlert(
        "Invalid Profile Links",
        "Please make sure you enter a valid profile link. For LinkedIn, use a link like: linkedin.com/in/your-profile. For GitHub, use a link like: github.com/your-profile."
      );
      return;
    }

    if (!isValidProfileLink(formData.github, "github") && formData.github) {
      showAlert(
        "Invalid Profile Links",
        "Please make sure you enter a valid profile link. For LinkedIn, use a link like: linkedin.com/in/your-profile. For GitHub, use a link like: github.com/your-profile."
      );
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/ResumeCreator/CreateResumeFromResources`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
          // 'linkedInLink': formData.linkedin,
            gitHubLink: formData.github,
            userPrompt: formData.preferences,
          }),
        }
      );

      // How I can to recieve this response?
      // Need to check if those links are valid for profile parsing
      const result = await response.json();
      console.log("Resume generated successfully:", result);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  const handleResetParameters = () => {
    console.log("Reset Parameters button clicked");
    linksRef.current.linkedin.value = "";
    linksRef.current.github.value = "";
    preferencesRef.current.value = "";
  };

  return (
    <div className="buttons-container">
      <button className="generate-resume" onClick={handleGenerateResume}>
        Generate Resume
      </button>
      <button className="reset-parameters" onClick={handleResetParameters}>
        Reset Parameters
      </button>
      {alertTitleMessage && alertDescMessage && (
        <div className={`alert-container ${isVisible ? "show" : "hide"}`}>
          <CustomAlert
            title={alertTitleMessage}
            description={alertDescMessage}
          />
        </div>
      )}
    </div>
  );
};

class DownloadButtons extends React.Component {
  render() {
    return (
      <div className="download-buttons">
        <button className="download-pdf">Download PDF</button>
        <button className="download-formats">...</button>
      </div>
    );
  }
}

export default Buttons;
export { DownloadButtons };
