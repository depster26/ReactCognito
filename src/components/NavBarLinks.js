import React from "react";

const AuthenticatedUserLinks = ({
  isSignedIn,
  currentUser,
  onSignOutClick,
}) => {
  const determineRender = () => {
    if (isSignedIn && currentUser) {
      return (
        <ul className="navbar-nav navbar-align">
          <li className="nav-item">
            <span className="navbar-text">{currentUser.name}</span>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link btn-sm p-0 m-0"
              onClick={() => onSignOutClick()}
            >
              (Logout)
            </button>
          </li>
        </ul>
      );
    }

    return null;
  };

  return determineRender();
};

export default AuthenticatedUserLinks;
