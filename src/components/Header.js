import React from "react";
import { Link } from "react-router-dom";

import NavBarLinks from "./NavBarLinks";

const Header = ({ isSignedIn, currentUser, onSignOutClick }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
      <div className="container-lg">
        <Link to={"/"} className="navbar-brand">
          React + Cognito
        </Link>
        <div className="d-flex align-items-center auth-links">
          <NavBarLinks
            isSignedIn={isSignedIn}
            currentUser={currentUser}
            onSignOutClick={onSignOutClick}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
