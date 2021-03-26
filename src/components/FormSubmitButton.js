import React from "react";
import Icon from "./Icon";

const FormSubmitButton = ({
  buttonText,
  iconClassName,
  isWorking = false,
  hasValidationErrors = true,
}) => {
  return (
    <button
      type="submit"
      className="btn btn-sm btn-primary"
      disabled={isWorking || hasValidationErrors}
    >
      {isWorking && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {!isWorking && <Icon cssClassName={iconClassName} />} {buttonText}
    </button>
  );
};

export default FormSubmitButton;
