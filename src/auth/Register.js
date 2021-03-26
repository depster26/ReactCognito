import React from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

import { setNewUserRegistered } from "./authStore";
import { setFeedbackMessage, setIsWorking } from "../app/appStore";
import {
  COGNITO_ERROR_USERNAME_EXISTS,
  COGNITO_ERROR_INVALID_PARAMETER,
} from "./authConstants";

import AuthPaths from "./authPaths";
import PageTitle from "../components/PageTitle";
import RegisterForm from "./RegisterForm";
import { ActionLink } from "../components/ActionLink";

const Register = () => {
  const dispatch = useDispatch();

  const { newAccountId, email } = useSelector((state) => state.auth.register);
  const { isWorking } = useSelector((state) => state.app);

  const onRegisterSubmit = ({ name, email, password, passwordConfirm }) => {
    const doRegister = async () => {
      try {
        dispatch(setIsWorking(true));
        const tempAccountId = uuid();

        const { user } = await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            name,
            email,
            "custom:account_id": tempAccountId,
          },
        });

        if (user) {
          dispatch(setNewUserRegistered(tempAccountId, email, true));
          dispatch(setFeedbackMessage("Account created successfully", false));
        }
      } catch (err) {
        console.log(err);
        switch (err.code) {
          case COGNITO_ERROR_USERNAME_EXISTS:
            dispatch(
              setFeedbackMessage(
                "This username has already been registered",
                true
              )
            );
            break;
          case COGNITO_ERROR_INVALID_PARAMETER:
            dispatch(
              setFeedbackMessage(
                "There appears to be a problem with your entries. Please check you've entered a valid email address and that the password meets the expected criteria.",
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
    doRegister();
  };

  const determineRender = () => {
    if (!isWorking && email && newAccountId) {
      return <Redirect to={AuthPaths.REGISTER_CONFIRM} />;
    }

    return (
      <>
        <PageTitle title="Register" />
        <RegisterForm onSubmit={onRegisterSubmit} isWorking={isWorking} />
        <hr />
        <ActionLink text="Already have an account?" path={AuthPaths.SIGN_IN} />
      </>
    );
  };

  return determineRender();
};

export default Register;
