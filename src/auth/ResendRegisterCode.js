import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";

import PageTitle from "../components/PageTitle";
import ResendRegisterCodeForm from "./ResendRegisterCodeForm";
import AuthPaths from "./authPaths";

import { ActionLink } from "../components/ActionLink";
import { setFeedbackMessage, setIsWorking } from "../app/appStore";
import { setNewUserRegistered } from "./authStore";

const ResendRegisterCode = () => {
  const dispatch = useDispatch();
  const { email, registerCodeSent } = useSelector(
    (state) => state.auth.register
  );
  const { isWorking } = useSelector((state) => state.app);

  const onResendSubmit = ({ email }) => {
    const doResendSubmit = async () => {
      try {
        dispatch(setIsWorking(true));
        await Auth.resendSignUp(email);
        dispatch(setNewUserRegistered(null, email, true));
      } catch (err) {
        dispatch(setFeedbackMessage(err.message, true));
      } finally {
        dispatch(setIsWorking(false));
      }
    };
    doResendSubmit();
  };

  const determineRender = () => {
    if (!isWorking && email && registerCodeSent) {
      return <Redirect to={AuthPaths.REGISTER_CONFIRM} />;
    }
    return (
      <>
        <PageTitle title="Resend Confirmation Code" />
        <p>
          If you registered for a new account but need another confirmation code
          sent, please enter your email below.
        </p>
        <ResendRegisterCodeForm onSubmit={onResendSubmit} />
        <hr />
        <ActionLink text="Sign in" path={AuthPaths.SIGN_IN} />
        <ActionLink text="Confirm Account" path={AuthPaths.REGISTER_CONFIRM} />
      </>
    );
  };

  return determineRender();
};

export default ResendRegisterCode;
