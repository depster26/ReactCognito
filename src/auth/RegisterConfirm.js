import React from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";

import { setFeedbackMessage, setIsWorking } from "../app/appStore";

import { setIsConfirmed } from "./authStore";
import AuthPaths from "./authPaths";
import PageTitle from "../components/PageTitle";
import RegisterConfirmForm from "./RegisterConfirmForm";
import { ActionLink } from "../components/ActionLink";

const RegisterConfirm = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { isWorking } = useSelector((state) => state.app);

  const onConfirmSubmit = ({ email, code }) => {
    const doConfirm = async () => {
      try {
        dispatch(setIsWorking(true));
        await Auth.confirmSignUp(email, code);

        dispatch(setIsConfirmed());
        dispatch(
          setFeedbackMessage(
            "Thank you. Your account has been verified. For security reasons, please sign in."
          )
        );
      } catch (err) {
        console.log(err);
        dispatch(setFeedbackMessage(err.message, true));
      } finally {
        dispatch(setIsWorking(false));
      }
    };

    doConfirm();
  };

  const determineRender = () => {
    if (!isWorking && authState.register.isConfirmed) {
      return <Redirect to={AuthPaths.SIGN_IN} />;
    }

    const formValues = {
      email: authState.register.email || "",
    };

    return (
      <>
        <PageTitle title="Confirm Account" />
        <p>
          You should have received an email with a confirmation code. Please
          enter your email and the confirmation code below.
        </p>
        <RegisterConfirmForm
          onSubmit={onConfirmSubmit}
          initialValues={formValues}
          isWorking={isWorking}
        />
        <hr />
        <ActionLink text="Sign in" path={AuthPaths.SIGN_IN} />
        <ActionLink
          text="Need a new confirmation code?"
          path={AuthPaths.REGISTER_CONFIRM_RESEND_CODE}
        />
      </>
    );
  };

  return determineRender();
};

export default RegisterConfirm;
