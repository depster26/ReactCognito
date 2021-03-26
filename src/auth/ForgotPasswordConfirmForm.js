import React from "react";
import { Form, Field } from "react-final-form";

import { ICON_CLASS_CHECK } from "../constants";
import ValidPasswordDisplay from "../components/ValidPasswordDisplay";
import FormSubmitButton from "../components/FormSubmitButton";

import {
  isRequired,
  emailMustBeLegit,
  composeValidators,
  getFormControlCssClass,
  getFormControlFeedback,
  pwdMustBeLongEnough,
  pwdMustContainerLowercaseLetter,
  pwdMustContainNumber,
  pwdMustContainerUppercaseLetter,
  pwdMustContainSpecialCharacter,
} from "../helpers/formHelpers";

const PasswordConfirmForm = (props) => {
  const { isWorking } = props;

  return (
    <Form
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.passwordConfirm) {
          errors.passwordConfirm = "You must confirm the password";
        } else if (values.passwordConfirm !== values.password) {
          errors.passwordConfirm = "Passwords don't match";
        }
        return errors;
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Field
            name="email"
            validate={composeValidators(isRequired, emailMustBeLegit)}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  {...input}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={getFormControlCssClass(meta)}
                />
                {getFormControlFeedback(meta)}
              </div>
            )}
          </Field>
          <Field
            name="confirmationCode"
            validate={composeValidators(isRequired)}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label">Confirmation Code</label>
                <input
                  {...input}
                  type="number"
                  placeholder="Enter confirmation code"
                  autoComplete="code"
                  autoFocus
                  className={getFormControlCssClass(meta)}
                />
                <small>Enter the code that was emailed to you.</small>
                {getFormControlFeedback(meta)}
              </div>
            )}
          </Field>
          <Field
            name="password"
            validate={composeValidators(
              pwdMustBeLongEnough,
              pwdMustContainNumber,
              pwdMustContainerLowercaseLetter,
              pwdMustContainerUppercaseLetter,
              pwdMustContainSpecialCharacter
            )}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  {...input}
                  type="password"
                  autoComplete="password"
                  placeholder="Enter a complex password"
                  className={getFormControlCssClass(meta)}
                />
                <ValidPasswordDisplay value={input.value} />
              </div>
            )}
          </Field>
          <Field
            name="passwordConfirm"
            validate={composeValidators(
              pwdMustBeLongEnough,
              pwdMustContainNumber,
              pwdMustContainerLowercaseLetter,
              pwdMustContainerUppercaseLetter,
              pwdMustContainSpecialCharacter
            )}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  {...input}
                  type="password"
                  autoComplete="password"
                  placeholder="Enter a complex password"
                  className={getFormControlCssClass(meta)}
                />
              </div>
            )}
          </Field>
          <div className="text-center">
            <FormSubmitButton
              buttonText="Reset Password"
              iconClassName={ICON_CLASS_CHECK}
              isWorking={isWorking}
              hasValidationErrors={props.hasValidationErrors}
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default PasswordConfirmForm;
