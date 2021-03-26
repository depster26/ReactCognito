import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";

import AppContainer from "../components/AppContainer";
import protectedPaths from "../protected/protectedPaths";
import protectedRoutes from "../protected/protectedRoutesConfig";

import publicPaths from "../auth/authPaths";
import publicRoutes from "../auth/authRoutesConfig";

import { setSignInRequired, setSignedIn } from "../auth/authStore";

const App = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSignIn = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        dispatch(setSignedIn(user.attributes));
      } catch (error) {
        dispatch(setSignInRequired);
      }
    };

    checkSignIn();
  }, [dispatch]);

  return authState.isSignedIn && authState.user ? (
    <AppContainer
      defaultRedirectPath={protectedPaths.DASHBOARD}
      routes={protectedRoutes}
    />
  ) : (
    <AppContainer
      defaultRedirectPath={publicPaths.SIGN_IN}
      routes={publicRoutes}
      useCardContainer={true}
    />
  );
};

export default App;
