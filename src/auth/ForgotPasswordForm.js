import React from "react";
import { Form, Field } from "react-final-form";

import FormSubmitButton from "../components/FormSubmitButton";
import { ICON_CLASS_CHECK } from "../constants";

import {
  isRequired,
  emailMustBeLegit,
  composeValidators,
  getFormControlCssClass,
} from "../helpers/formHelpers";

const ForgotPasswordForm = (props) => {
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
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  autoFocus
                  className={getFormControlCssClass(meta)}
                />
              </div>
            )}
          </Field>
          <div className="text-center">
            <FormSubmitButton
              buttonText="Reset Password"
              iconClassName={ICON_CLASS_CHECK}
              submitting={props.submitting}
              hasValidationErrors={props.hasValidationErrors}
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default ForgotPasswordForm;
