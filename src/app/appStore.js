export const APP_IS_WORKING = "APP_IS_WORKING";
export const APP_FEEDBACK_MESSAGE = "APP_FEEDBACK_MESSAGE";
export const APP_CLEAR_FEEDBACK_MESSAGE = "APP_CLEAR_FEEDBACK_MESSAGE";
export const APP_REDIRECT = "APP_REDIRECT";
export const APP_BREADCRUMBS = "APP_BREADCRUMBS";

export const setIsWorking = (isWorking = true) => {
  return {
    type: APP_IS_WORKING,
    payload: {
      isWorking: isWorking,
    },
  };
};

export const setFeedbackMessage = (message, isError) => {
  return {
    type: APP_FEEDBACK_MESSAGE,
    payload: {
      feedbackMessage: {
        message: message,
        isError: isError,
      },
    },
  };
};

export const clearFeedbackMessage = () => {
  return {
    type: APP_CLEAR_FEEDBACK_MESSAGE,
    payload: {
      feedbackMessage: null,
    },
  };
};

export const setRedirect = (toLink) => {
  return {
    type: APP_REDIRECT,
    payload: {
      redirectTo: toLink,
    },
  };
};

export const setBreadcrumbs = (items) => {
  return {
    type: APP_BREADCRUMBS,
    payload: {
      breadcrumbs: items,
    },
  };
};

const APP_INITIAL_STATE = {
  isWorking: false,
  feedbackMessage: null,
  breadcrumbs: null,
  redirectTo: null,
};

const appReducer = (state = APP_INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_BREADCRUMBS:
    case APP_REDIRECT:
    case APP_CLEAR_FEEDBACK_MESSAGE:
    case APP_FEEDBACK_MESSAGE:
    case APP_IS_WORKING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
