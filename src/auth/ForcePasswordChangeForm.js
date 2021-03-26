import React from "react";
import { Form, Field } from "react-final-form";

import ValidPasswordDisplay from "../components/ValidPasswordDisplay";
import FormSubmitButton from "../components/FormSubmitButton";
import { ICON_CLASS_SAVE } from "../constants";
import {
  isRequired,
  composeValidators,
  getFormControlCssClass,
  getFormControlFeedback,
  pwdMustBeLongEnough,
  pwdMustContainerLowercaseLetter,
  pwdMustContainNumber,
  pwdMustContainerUppercaseLetter,
  pwdMustContainSpecialCharacter,
} from "../helpers/formHelpers";

const CompleteNewPasswordForm = (props) => {
  const { isWorking } = props;

  return (
    <Form
      onSubmit={props.onSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.confirmPassword) {
          errors.confirmPassword = "You must confirm the new password";
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = "Passwords don't match";
        }
        console.log(values);
        console.log(errors);
        return errors;
      }}
    >
      {(props) => (
        <form className="ui form" onSubmit={props.handleSubmit}>
          <Field name="name" validate={isRequired}>
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  {...input}
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  autoFocus
                  className={getFormControlCssClass(meta)}
                />
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
                <label>New Password:</label>
                <input
                  {...input}
                  type="password"
                  placeholder="Enter new password"
                  className={getFormControlCssClass(meta)}
                />
                <ValidPasswordDisplay value={input.value} />
              </div>
            )}
          </Field>
          <Field name="confirmPassword" validate={isRequired}>
            {({ input, meta }) => (
              <div className="mb-3">
                <label>Confirm New Password:</label>
                <input
                  {...input}
                  type="password"
                  placeholder="Confirm new password"
                  className={getFormControlCssClass(meta)}
                />
                {getFormControlFeedback(meta)}
              </div>
            )}
          </Field>
          <FormSubmitButton
            buttonText="Save"
            iconClassName={ICON_CLASS_SAVE}
            isWorking={isWorking}
            hasValidationErrors={props.hasValidationErrors}
          />
        </form>
      )}
    </Form>
  );
};

export default CompleteNewPasswordForm;
