import React from "react";
import { Form, Field } from "react-final-form";

import FormSubmitButton from "../components/FormSubmitButton";
import { ICON_CLASS_CHECK } from "../constants";
import {
  emailMustBeLegit,
  composeValidators,
  isRequired,
  getFormControlCssClass,
} from "../helpers/formHelpers";

const RegisterConfirmForm = (props) => {
  const { isWorking } = props;
  return (
    <Form onSubmit={props.onSubmit} initialValues={props.initialValues}>
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
                  className={getFormControlCssClass(meta)}
                  autoFocus
                />
                <small>Enter the email address you used to register.</small>
              </div>
            )}
          </Field>
          <Field name="code" validate={isRequired}>
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label">Confirmation code</label>
                <input
                  {...input}
                  type="number"
                  placeholder="Enter the confirmation code"
                  className={getFormControlCssClass(meta)}
                />
                <small>
                  Enter the confirmation code from the registration email.
                </small>
              </div>
            )}
          </Field>
          <div className="text-center">
            <FormSubmitButton
              buttonText="Confirm"
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

export default RegisterConfirmForm;
