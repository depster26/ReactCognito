import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";

import { setCognitoUser, setSignedIn, setForgotPassword } from "./authStore";
import { setFeedbackMessage, setIsWorking } from "../app/appStore";
import {
  COGNITO_ERROR_NOT_AUTHORIZED,
  COGNITO_ERROR_USER_NOT_FOUND,
  COGNITO_CHALLENGE_PWD_REQUIRED,
} from "./authConstants";

import AuthPaths from "./authPaths";
import SignInForm from "./SignInForm";
import PageTitle from "../components/PageTitle";
import ForcePasswordChangeForm from "./ForcePasswordChangeForm";
import { ActionLink, ActionLinkWithClickEvent } from "../components/ActionLink";

const SignIn = () => {
  const authState = useSelector((state) => state.auth);
  const { isWorking } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const onSignInSubmit = ({ email, password }) => {
    const doSignIn = async () => {
      dispatch(setIsWorking(true));
      try {
        const user = await Auth.signIn(email, password);
        console.log(user);
        if (user.challengeName === COGNITO_CHALLENGE_PWD_REQUIRED) {
          dispatch(setCognitoUser(user));
        } else {
          dispatch(setSignedIn(user.attributes));
        }
      } catch (err) {
        switch (err.code) {
          case COGNITO_ERROR_NOT_AUTHORIZED:
          case COGNITO_ERROR_USER_NOT_FOUND:
            dispatch(
              setFeedbackMessage(
                "Incorrect username or password. Please check your entries and try again.",
                true
              )
            );
            break;
          default:
            dispatch(setFeedbackMessage(err.message, true));
        }
      } finally {
        dispatch(setIsWorking(false));
      }
    };

    doSignIn();
  };

  const onConfirmNewPasswordSubmit = ({ name, password }) => {
    const doConfirmPassword = async () => {
      try {
        dispatch(setIsWorking(true));
        await Auth.completeNewPassword(authState.cognitoUser, password, {
          name: name,
        });

        const user = await Auth.currentAuthenticatedUser();
        dispatch(setSignedIn(user.attributes));
      } catch (err) {
        dispatch(setFeedbackMessage(err.message, true));
      } finally {
        dispatch(setIsWorking(false));
      }
    };

    doConfirmPassword();
  };

  const onForgotPasswordClick = () => {
    dispatch(setForgotPassword(null, null, null));
  };

  const determineAuthRender = () => {
    if (!authState.user && authState.cognitoUser && !isWorking) {
      return (
        <>
          <PageTitle title="Password Change Required" />
          <p>
            Looks like this is the first time you've logged in. As a security
            measure you must change you password.
          </p>
          <ForcePasswordChangeForm onSubmit={onConfirmNewPasswordSubmit} />
        </>
      );
    }

    return (
      <>
        <PageTitle title="Sign In" />
        <SignInForm onSubmit={onSignInSubmit} isWorking={isWorking} />
        <hr />
        <ActionLinkWithClickEvent
          text="Forgot password?"
          path={AuthPaths.FORGOT_PASSWORD}
          onClickEvent={onForgotPasswordClick}
        />
        <ActionLink text="Register new account" path={AuthPaths.REGISTER} />
        <ActionLink
          text="Need to confirm a new account registration?"
          path={AuthPaths.REGISTER_CONFIRM}
        />
      </>
    );
  };

  return determineAuthRender();
};

export default SignIn;
