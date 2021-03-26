import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

import { setFeedbackMessage, setIsWorking } from "../app/appStore";
import { setForgotPassword } from "./authStore";
import AuthPaths from "./authPaths";
import PageTitle from "../components/PageTitle";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordConfirmForm from "./ForgotPasswordConfirmForm";
import { ActionLink, ActionLinkWithClickEvent } from "../components/ActionLink";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector((state) => state.auth);
  const { isWorking } = useSelector((state) => state.app);

  const onResetSubmit = ({ email }) => {
    const doReset = async () => {
      try {
        dispatch(setIsWorking(true));
        await Auth.forgotPassword(email);
        dispatch(setForgotPassword(true, email, false));
      } catch (err) {
        dispatch(setFeedbackMessage(err.message, true));
      } finally {
        dispatch(setIsWorking(false));
      }
    };

    doReset();
  };

  const onConfirmSubmit = ({ email, confirmationCode, password }) => {
    const doConfirm = async () => {
      try {
        dispatch(setIsWorking(true));
        await Auth.forgotPasswordSubmit(email, confirmationCode, password);
        dispatch(setForgotPassword(true, email, true));
        dispatch(setFeedbackMessage("Your password has been reset", false));
      } catch (err) {
        dispatch(setFeedbackMessage(err.message, true));
      } finally {
        dispatch(setIsWorking(false));
      }
    };

    doConfirm();
  };

  const determineRender = () => {
    if (
      !isWorking &&
      forgotPassword.inProgress &&
      forgotPassword.email &&
      !forgotPassword.success
    ) {
      const formValues = {
        email: forgotPassword.email,
      };

      return (
        <>
          <PageTitle title="Forgot Password Confirm" />
          <p>Please check your email for a confirmation code.</p>
          <ForgotPasswordConfirmForm
            onSubmit={onConfirmSubmit}
            initialValues={formValues}
          />
          <hr />
          <ActionLinkWithClickEvent
            text="Request new code"
            path="#"
            onClickEvent={(e) => dispatch(setForgotPassword(null, null, null))}
          />
          <ActionLink text="Sign In" path={AuthPaths.SIGN_IN} />
        </>
      );
    }

    if (!isWorking && forgotPassword.inProgress && forgotPassword.success) {
      return <Redirect to={AuthPaths.SIGN_IN} />;
    }

    return (
      <>
        <PageTitle title="Forgot Password" />
        <p>
          Please enter your email below and we'll send you a confirmation code
          to reset your password.
        </p>
        <ForgotPasswordForm onSubmit={onResetSubmit} />
        <hr />
        <ActionLink text="Sign In" path={AuthPaths.SIGN_IN} />
      </>
    );
  };

  return determineRender();
};

export default ForgotPassword;
