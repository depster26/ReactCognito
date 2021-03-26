import isEmail from "validator/lib/isEmail";

export const isRequired = (value) => (value ? undefined : "Required");

export const emailMustBeLegit = (email) =>
  email && isValidEmail(email) ? undefined : "Must be a valid email address";

export const pwdMustBeLongEnough = (pwd) =>
  longEnough(pwd) ? undefined : "Not long enough";

export const pwdMustContainerUppercaseLetter = (pwd) =>
  containsUppercaseLetter(pwd) ? undefined : "Must contain uppercase letter";

export const pwdMustContainerLowercaseLetter = (pwd) =>
  containsLowercaseLetter(pwd) ? undefined : "Must contain lowercase letter";

export const pwdMustContainNumber = (pwd) =>
  containsNumber(pwd) ? undefined : "Must container a number";

export const pwdMustContainSpecialCharacter = (pwd) =>
  containsSpecialCharacter(pwd)
    ? undefined
    : "Must container a special character";

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const getFormControlCssClass = (meta) => {
  return `form-control ${meta.error && meta.touched && "is-invalid"} ${
    !meta.error && meta.touched && "is-valid"
  }`;
};

export const getFormControlFeedback = (meta, showError = true) => {
  if (meta.error && meta.touched) {
    return <div className="invalid-feedback">{showError && meta.error}</div>;
  }

  return null;
};

export const isValidEmail = (email) => isEmail(email);

export const longEnough = (value) =>
  value && value.length >= 8 ? true : false;

export const containsUppercaseLetter = (value) =>
  value && value.toLowerCase() !== value ? true : false;

export const containsLowercaseLetter = (value) =>
  value && value.toUpperCase() !== value ? true : false;

export const containsNumber = (value) => /\d/.test(value);

export const containsSpecialCharacter = (value) =>
  /[\s~`!@#$%^&*+=\-[\]\\';,/{}|\\":<>?()._]/g.test(value);
