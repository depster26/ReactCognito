import React from "react";
import { Form, Field } from "react-final-form";

import FormSubmitButton from "../components/FormSubmitButton";
import { ICON_CLASS_SIGN_IN } from "../constants";
import {
  isRequired,
  getFormControlCssClass,
  emailMustBeLegit,
  composeValidators,
} from "../helpers/formHelpers";

const SignInForm = (props) => {
  const { isWorking } = props;

  return (
    <Form onSubmit={props.onSubmit}>
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
                  type="text"
                  placeholder="Enter your email"
                  autoFocus
                  autoComplete="email"
                  className={getFormControlCssClass(meta)}
                />
              </div>
            )}
          </Field>
          <Field name="password" validate={isRequired}>
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  {...input}
                  className={getFormControlCssClass(meta)}
                  type="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>
            )}
          </Field>
          <div className="text-center">
            <FormSubmitButton
              buttonText="Sign In"
              iconClassName={ICON_CLASS_SIGN_IN}
              isWorking={isWorking}
              hasValidationErrors={props.hasValidationErrors}
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default SignInForm;
