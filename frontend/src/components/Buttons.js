import React, { useRef } from "react";

// Write correct adress here
const backendUrl = window.BACKEND_URL || "http://localhost:5000";

const Buttons = ({ linksRef, preferencesRef }) => {
  const isValidProfileLink = (url, platform) => {
    try {
      if (!url) return false;
      console.log("Validating URL:", url);
      console.log("Platform:", platform);
      if (platform === "linkedin") {
        console.log("Validating LinkedIn URL:", url);
        const regex = /^(https?:\/\/)?(www\.)?(linkedin\.com\/in\/[a-zA-Z0-9-]+)/;
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

  const handleGenerateResume = async () => {
    console.log("Generate Resume button clicked");

    const formData = {
      linkedin: linksRef.current?.linkedin?.value.trim() || "",
      github: linksRef.current?.github?.value.trim() || "",
      preferences: preferencesRef.current?.value.trim() || "",
    };

    console.log("Form data:", formData);

    // Check if filled correctly fields
    if (
      (formData.linkedin || !formData.github) &&
      (!formData.linkedin || formData.github) &&
      (!formData.linkedin && !formData.github)
    ) {
      alert("Please fill in any fields.");
      return;
    }

    // Check if URLs are valid
    if (!isValidProfileLink(formData.linkedin, "linkedin") && formData.linkedin) {
      alert("Please enter a valid LinkedIn profile URL.");
      return;
    }

    if (!isValidProfileLink(formData.github, "github") && formData.github) {
      alert("Please enter a valid GitHub profile URL.");
      return;
    }

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

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
      <button className="reset-parameters" onClick={handleResetParameters}>Reset Parameters</button>
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
