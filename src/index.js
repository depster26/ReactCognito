import React from "react";
import ReactDom from "react-dom";
import Amplify from "aws-amplify";
import { Provider } from "react-redux";

import store from "./app/store";
import { amplify_auth_config } from "./aws-config";
import App from "./app/App";

Amplify.configure({
  Auth: amplify_auth_config,
});

const rootElement = document.querySelector("#root");

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
