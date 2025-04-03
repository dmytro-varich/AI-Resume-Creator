import React from "react";
import { ImGithub } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import LinkInput from "./LinkInput";

class Links extends React.Component {
  render() {
    return (
      <div className="links-container">
        <h2>Links</h2>
        <LinkInput
          label="LinkedIn"
          placeholder="linkedin.com/in/your-profile"
          icon={<FaLinkedin />}
          id="linkedin-input"
        />
        <LinkInput
          label="GitHub"
          placeholder="github.com/your-profile"
          icon={<ImGithub />}
          id={"github-input"}
        />
      </div>
    );
  }
}

export default Links;
