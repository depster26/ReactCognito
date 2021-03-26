import React from "react";
import { Form, Field } from "react-final-form";

import ValidPasswordDisplay from "../components/ValidPasswordDisplay";
import FormSubmitButton from "../components/FormSubmitButton";
import { ICON_CLASS_CHECK } from "../constants";
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

const RegisterForm = (props) => {
  const { isWorking } = props;
  return (
    <Form
      onSubmit={props.onSubmit}
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
          <Field name="name" validate={isRequired}>
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label required">Name</label>
                <input
                  {...input}
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  autoFocus
                  className={getFormControlCssClass(meta)}
                />
              </div>
            )}
          </Field>
          <Field
            name="email"
            validate={composeValidators(isRequired, emailMustBeLegit)}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label required">Email</label>
                <input
                  {...input}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={getFormControlCssClass(meta)}
                />
                {getFormControlFeedback(meta)}
                <small>
                  <p>
                    Please provide a valid email address to receive a
                    confirmation link.
                  </p>
                </small>
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
                <label className="form-label required">Password</label>
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
          <Field name="passwordConfirm" validate={isRequired}>
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label required">Confirm Password</label>
                <input
                  {...input}
                  type="password"
                  placeholder="Renter your password"
                  autoComplete="password-confirm"
                  className={getFormControlCssClass(meta)}
                />
                {getFormControlFeedback(meta)}
              </div>
            )}
          </Field>
          <div className="text-center">
            <FormSubmitButton
              buttonText="Register"
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

export default RegisterForm;
