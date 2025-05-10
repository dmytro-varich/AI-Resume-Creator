import React, { forwardRef } from "react";
import { ImGithub } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import LinkInput from "./LinkInput";

const Links = forwardRef((props, ref) => {
  return (
    <div className="links-container">
      <h2>Links</h2>
      <div className="links-input">
        <LinkInput
          label="LinkedIn"
          placeholder="linkedin.com/in/your-profile"
          icon={<FaLinkedin />}
          id="linkedin-input"
          ref={(el) => {
            ref.current = { ...ref.current, linkedin: el };
          }}
        />
        <LinkInput
          className="github-input"
          label="GitHub"
          placeholder="github.com/your-profile"
          icon={<ImGithub />}
          id={"github-input"}
          ref={(el) => {
            ref.current = { ...ref.current, github: el };
          }}
        />
      </div>
    </div>
  );
});

export default Links;
