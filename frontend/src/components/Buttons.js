import React, { useState, useRef, useEffect } from "react";
import CustomAlert from "./Alert";
import { BsFiletypeHtml, BsFiletypeDocx, BsMarkdown } from "react-icons/bs";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const Buttons = ({
  linksRef,
  preferencesRef,
  setPdfBlob,
  resetPreferences,
  setIsLoading,
  isLoading,
}) => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alertTitleMessage, setAlertTitleMessage] = useState(null);
  const [alertDescMessage, setAlertDescMessage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [previousData, setpreviousData] = useState(null);

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
    if (isLoading) {
      console.log("Resume generation already in progress.");
      return;
    }

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

    if (
      previousData &&
      JSON.stringify(previousData) === JSON.stringify(formData)
    ) {
      console.log(
        "No changes detected in form data. Skipping resume generation."
      );
      return;
    }
    setpreviousData(formData);

    try {
      setIsLoading(true);
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
      // const response = await fetch(
      //   `${backendUrl}/api/ResumeCreator/CreateTestResume`,
      //   {
      //     method: "POST",
      //     headers: { "Content-type": "application/json" },
      //     body: JSON.stringify({ resultContent: formData.preferences }),
      //   }
      // );
      console.log("Response:", response);
      if (!response.ok) {
        console.error("Error generating resume:", response.statusText);
        showAlert(
          "Generate Resume Error",
          "An error occurred while generating the resume. Please try again later. Make sure the link you provided matches your actual LinkedIn or GitHub profile URL."
        );
        setIsLoading(false);
        return;
      } else {
        const blob = await response.blob();
        setPdfBlob(blob);
        setIsLoading(false);
        console.log("Resume generated successfully!");
      }
    } catch (error) {
      console.error("Error generating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetParameters = () => {
    console.log("Reset Parameters button clicked");
    linksRef.current.linkedin.value = "";
    linksRef.current.github.value = "";

    if (preferencesRef.current) {
      preferencesRef.current.value = "";
    }

    resetPreferences();
    setpreviousData(null);
  };

  return (
    <div className="buttons-container">
      <button className="generate-resume" onClick={handleGenerateResume} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Resume"}
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

const DownloadButtons = ({ pdfBlob }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDownloadPDF = () => {
    console.log("Download PDF button clicked");
    if (!pdfBlob) {
      console.warn("PDF blob not available yet.");
      return;
    }

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
    console.log("PDF downloaded successfully!");
  };

  return (
    <div className="download-buttons">
      <button className="download-pdf" onClick={handleDownloadPDF}>
        Download PDF
      </button>
      <button className="download-formats" onClick={() => setIsOpen(!isOpen)}>
        ...
      </button>
      {isOpen && (
        <div
          className="absolute right-5 top-20 w-56 h-35 drop-shadow-sm border rounded-lg shadow-md bg-[#d9d9d9] z-50"
          ref={containerRef}
        >
          <button className="w-full gap-2 flex items-center py-2 px-3 text-red bg-[#1e1e1e] rounded-lg hover:bg-[#424242]">
            <BsFiletypeDocx /> Export to DOCX
          </button>
          <button className="w-full gap-2 flex items-center py-2 px-3 text-white bg-[#1e1e1e] rounded-lg hover:bg-[#424242]">
            <BsFiletypeHtml /> Export to HTML
          </button>
          <button className="w-full gap-2 flex items-center py-2 px-3 text-white bg-[#1e1e1e] rounded-lg hover:bg-[#424242]">
            <BsMarkdown />
            Export to Markdown
          </button>
        </div>
      )}
    </div>
  );
};

export default Buttons;
export { DownloadButtons };
