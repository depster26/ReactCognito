import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth } from "aws-amplify";

import FeedbackMessage from "../components/FeedbackMessage";
import Wrapper from "../components/Wrapper";
import RenderRoutes from "../components/RenderRoutes";
import Header from "../components/Header";

import { setFeedbackMessage, clearFeedbackMessage } from "../app/appStore";
import { setSignOut } from "../auth/authStore";
import CardContainerSmall from "./CardContainerSmall";

const AppContainer = ({
  routes,
  defaultRedirectPath,
  useCardContainer = false,
}) => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const message = useSelector((state) => state.app.feedbackMessage);

  const onClearFeedbackClick = () => {
    dispatch(clearFeedbackMessage());
  };

  const onSignOutClick = () => {
    const doSignOut = async () => {
      try {
        await Auth.signOut();
        dispatch(setSignOut());
      } catch (err) {
        dispatch(setFeedbackMessage(err.message, true));
      }
    };

    doSignOut();
  };

  const renderRoutes = () => {
    if (useCardContainer) {
      return (
        <CardContainerSmall>
          <RenderRoutes
            routes={routes}
            defaultRedirectPath={defaultRedirectPath}
          />
        </CardContainerSmall>
      );
    }

    return (
      <RenderRoutes routes={routes} defaultRedirectPath={defaultRedirectPath} />
    );
  };

  return (
    <>
      <Router>
        <Header
          isSignedIn={authState.isSignedIn}
          currentUser={authState.user}
          onSignOutClick={onSignOutClick}
        />
        <Wrapper>
          <FeedbackMessage
            message={message}
            onClearFeedbackClick={onClearFeedbackClick}
          />
          {renderRoutes()}
        </Wrapper>
      </Router>
    </>
  );
};

export default AppContainer;
