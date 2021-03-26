import React from "react";
import { Link } from "react-router-dom";

const ActionLinkWrapper = ({ children }) => {
  return (
    <div className="mb-1">
      <small>{children}</small>
    </div>
  );
};

export const ActionLink = ({ text, path }) => {
  return (
    <ActionLinkWrapper>
      <Link to={path}>{text}</Link>
    </ActionLinkWrapper>
  );
};

export const ActionLinkWithClickEvent = ({
  text,
  path,
  onClickEvent = null,
}) => {
  return (
    <ActionLinkWrapper>
      <Link to={path} onClick={onClickEvent}>
        {text}
      </Link>
    </ActionLinkWrapper>
  );
};
