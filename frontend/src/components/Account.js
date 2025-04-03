import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
// import { GiHydra } from "react-icons/gi";


class Account extends React.Component {
  render() {
    return (
      <div className="user-container">
        {/* <GiHydra className="logo-icon" /> */}
        <HiOutlineUserCircle className="user-icon" />
      </div>
    );
  }
}

export default Account;
