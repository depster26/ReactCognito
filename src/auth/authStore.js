const SIGN_IN_REQUIRED = "SIGN_IN_REQUIRED";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const AUTH_SET_NEW_USER_REGISTER = "AUTH_SET_NEW_USER_REGISTER";
const AUTH_SET_CONGNITO_USER = "AUTH_SET_CONGNITO_USER";
const AUTH_CONFIRMED = "AUTH_CONFIRMED";
const AUTH_FORGOT_PWD_IN_PROGRESS = "AUTH_FORGOT_PWD_IN_PROGRESS";

const REGISTER_INITIAL_STATE = {
  email: null,
  isConfirmed: null,
  newAccountId: null,
  registerCodeSent: null,
};

const FORGOT_PASSWORD_INITIAL_STATE = {
  email: null,
  inProgress: null,
  success: null,
};

const AUTH_INITIAL_STATE = {
  isSignedIn: null,
  cognitoUser: null,
  user: null,
  register: REGISTER_INITIAL_STATE,
  forgotPassword: FORGOT_PASSWORD_INITIAL_STATE,
};

export const setSignedIn = (userAttributes) => {
  return {
    type: SIGN_IN,
    payload: { ...AUTH_INITIAL_STATE, isSignedIn: true, user: userAttributes },
  };
};

export const setSignInRequired = () => {
  return {
    type: SIGN_IN_REQUIRED,
    payload: {
      isSignedIn: false,
    },
  };
};

export const setCognitoUser = (cognitoUser) => {
  return {
    type: AUTH_SET_CONGNITO_USER,
    payload: {
      cognitoUser: cognitoUser,
    },
  };
};

export const setSignOut = () => {
  return {
    type: SIGN_OUT,
    payload: AUTH_INITIAL_STATE,
  };
};

export const setNewUserRegistered = (accountId, email, registerCodeSent) => {
  return {
    type: AUTH_SET_NEW_USER_REGISTER,
    payload: {
      register: {
        ...REGISTER_INITIAL_STATE,
        newAccountId: accountId,
        email: email,
        registerCodeSent: registerCodeSent,
      },
    },
  };
};

export const setIsConfirmed = (accountId) => {
  return {
    type: AUTH_CONFIRMED,
    payload: {
      register: {
        ...REGISTER_INITIAL_STATE,
        isConfirmed: true,
      },
    },
  };
};

export const setForgotPassword = (inProgress, email, success) => {
  return {
    type: AUTH_FORGOT_PWD_IN_PROGRESS,
    payload: {
      forgotPassword: {
        email: email,
        inProgress: inProgress,
        success: success,
      },
    },
  };
};

export const authReducer = (state = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SET_NEW_USER_REGISTER:
    case SIGN_IN_REQUIRED:
    case SIGN_OUT:
    case SIGN_IN:
    case AUTH_SET_CONGNITO_USER:
    case AUTH_CONFIRMED:
    case AUTH_FORGOT_PWD_IN_PROGRESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
