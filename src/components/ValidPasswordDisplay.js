import React from "react";

import Icon from "./Icon";
import { ICON_CLASS_CHECK, ICON_CLASS_TIMES } from "../constants";
import {
  longEnough,
  containsLowercaseLetter,
  containsNumber,
  containsUppercaseLetter,
  containsSpecialCharacter,
} from "../helpers/formHelpers";

const CheckItem = ({ isValid, displayText }) => {
  return (
    <>
      <p className={isValid ? "pwd-item-valid" : "pwd-item-invalid"}>
        <Icon cssClassName={isValid ? ICON_CLASS_CHECK : ICON_CLASS_TIMES} />{" "}
        {displayText}
      </p>
    </>
  );
};

const ValidPasswordDisplay = ({ value }) => {
  return (
    <small>
      <CheckItem
        isValid={longEnough(value)}
        displayText="Must be at least 8 characters long"
      />
      <CheckItem
        isValid={containsLowercaseLetter(value)}
        displayText="Must contain at least one lowercase letter"
      />
      <CheckItem
        isValid={containsUppercaseLetter(value)}
        displayText="Must contain at least one uppercase letter"
      />
      <CheckItem
        isValid={containsNumber(value)}
        displayText="Must contain at least one number"
      />
      <CheckItem
        isValid={containsSpecialCharacter(value)}
        displayText="Must contain at least one special character (~!@#$%^&*<>.,\';:{}[]|+-=?)"
      />
    </small>
  );
};

export default ValidPasswordDisplay;
