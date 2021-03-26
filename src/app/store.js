import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reduxThunk from "redux-thunk";

import appReducer from "./appStore";
import { authReducer } from "../auth/authStore";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
